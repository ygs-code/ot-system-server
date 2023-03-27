var DB = require("./index");
var moment = require("moment");
var Snapshot = require("./snapshot");
var util = require("./util");
var clone = util.clone;

// In-memory ShareDB database
//
// This adapter is not appropriate for production use. It is intended for
// testing and as an API example for people implementing database adaptors. It
// is fully functional, except it stores all documents & operations forever in
// memory. As such, memory usage will grow without bound, it doesn't scale
// across multiple node processes and you'll lose all your data if the server
// restarts. Query APIs are adapter specific. Use with care.

function MemoryDB(options = {}) {
  if (!(this instanceof MemoryDB)) {
    return new MemoryDB(options);
  }
  DB.call(this, options);

  this.options = options;

  // Map from collection name -> doc id -> doc snapshot ({v:, type:, data:})
  this.docs = {};

  // Map from collection name -> doc id -> list of operations. Operations
  // don't store their version - instead their version is simply the index in
  // the list.
  this.ops = {};

  this.closed = false;
}
module.exports = MemoryDB;

MemoryDB.prototype = Object.create(DB.prototype);

MemoryDB.prototype.close = function (callback) {
  this.closed = true;
  if (callback) callback();
};

// Persists an op and snapshot if it is for the next version. Calls back with
// callback(err, succeeded)
//保存下一个版本的op和快照。 电话用x

MemoryDB.prototype.commit = async function (
  collection,
  id,
  op,
  snapshot,
  options,
  callback
) {
  var db = this;
  if (typeof callback !== "function") throw new Error("Callback required");
  // util.nextTick(async function () {
  // 获取版本
  var version = await db._getVersionSync(collection, id);
  if (snapshot.v !== version + 1) {
    var succeeded = false;
    return;
    // 屏蔽这里避免服务器重启进入死循环
    // return callback(null, succeeded);
  }
  // 写入 op
  var err = await db._writeOpSync({ collection, id, snapshot, op });
  if (err) return callback(err);
  // 写入快照
  await db
    ._writeSnapshotSync({ collection, id, snapshot, op })
    .catch((err) => {
      if (err) {
        return callback(err);
      }
    })
    .then(() => {
      var succeeded = true;
      callback(null, succeeded);
    });
  // });
};

// Get the named document from the database. The callback is called with (err,
// snapshot). A snapshot with a version of zero is returned if the docuemnt
// has never been created in the database.
//从数据库中获取指定文档。 回调函数用(err，snapshot)。 如果文档的版本为0，则返回一个快照
//没有在数据库中创建。 获取快照
MemoryDB.prototype.getSnapshot = async function (
  collection,
  id,
  fields,
  options,
  callback
) {
  var includeMetadata =
    (fields && fields.$submit) || (options && options.metadata);
  var db = this;
  if (typeof callback !== "function") throw new Error("Callback required");
  // util.nextTick(async function () {
  var snapshot = await db._getSnapshotSync(collection, id, includeMetadata);
  callback(null, snapshot);
  // });
};

// Get operations between [from, to) noninclusively. (Ie, the range should
// contain start but not end).
//
// If end is null, this function should return all operations from start onwards.
//
// The operations that getOps returns don't need to have a version: field.
// The version will be inferred from the parameters if it is missing.
//
// Callback should be called as callback(error, [list of ops]);
MemoryDB.prototype.getOps = async function (
  collection,
  id,
  from,
  to,
  options,
  callback
) {
  var includeMetadata = options && options.metadata;
  var db = this;
  if (typeof callback !== "function") throw new Error("Callback required");
  // util.nextTick(async function () {
  var opLog = await db._getOpLogSync(collection, id);

  if (to == null) {
    to = opLog.length;
  }
  var ops = clone(opLog.slice(from, to));
  if (!includeMetadata) {
    for (var i = 0; i < ops.length; i++) {
      delete ops[i].m;
    }
  }

  callback(null, ops);
  // });
};

// The memory database query function returns all documents in a collection
// regardless of query by default
MemoryDB.prototype.query = async function (
  collection,
  query,
  fields,
  options,
  callback
) {
  var includeMetadata = options && options.metadata;
  var db = this;
  if (typeof callback !== "function") throw new Error("Callback required");
  // util.nextTick(async function () {
  var collectionDocs = db.docs[collection];
  var snapshots = [];
  for (var id in collectionDocs || {}) {
    var snapshot = await db._getSnapshotSync(collection, id, includeMetadata);
    snapshots.push(snapshot);
  }
  try {
    var result = db._querySync(snapshots, query, options);
    callback(null, result.snapshots, result.extra);
  } catch (err) {
    callback(err);
  }
  // });
};

// For testing, it may be useful to implement the desired query
// language by defining this function. Returns an object with
// two properties:
// - snapshots: array of query result snapshots
// - extra: (optional) other types of results, such as counts
MemoryDB.prototype._querySync = function (snapshots) {
  return { snapshots: snapshots };
};

// 写入op
MemoryDB.prototype._writeOpSync = async function ({
  collection,
  id,
  snapshot,
  op,
}) {
  const {
    getOpsDocument,
    createOpsDocument = () => {},
    editOpsDocument = () => {},
  } = this.options;

  var opLog = await this._getOpLogSync(collection, id);
  // var action = '';
  // if (!opLog.length) {
  //     action = 'add';
  // } else {
  //     action = 'edit';
  // }

  const { userId } = op.data || {};

  // This will write an op in the log at its version, which should always be
  // the next item in the array under normal operation
  opLog[op.v] = clone(op);
  await editOpsDocument("o_" + collection, { id, ops: opLog, userId });
  // if (action == 'add') {
  //     await createOpsDocument('o_' + collection, id, JSON.stringify(opLog));
  // } else {
  //     await editOpsDocument('o_' + collection, id, JSON.stringify(opLog));
  // }
};

// Create, update, and delete snapshots. For creates and updates, a snapshot
// object will be passed in with a type property. If there is no type property,
// it should be considered a delete
MemoryDB.prototype._writeSnapshotSync = async function ({
  collection,
  id,
  snapshot,
  op,
}) {
  const {
    createDocument = () => {},
    editDocument = () => {},
    removeDocument = () => {},
  } = this.options;

  var collectionDocs = this.docs[collection] || (this.docs[collection] = {});

  if (op.create) {
    await createDocument(collection, {
      ...op.data,
      ...snapshot,
    });
  } else if (!snapshot.type) {
    delete collectionDocs[id];
    await removeDocument(collection, id);
  } else {
    collectionDocs[id] = clone(snapshot);
    await editDocument(collection, {
      ...op.data,
      ...snapshot,
    });
  }
};

MemoryDB.prototype._getSnapshotSync = async function (
  collection,
  id,
  includeMetadata
) {
  const { getDocument, createDocument } = this.options;

  var collectionDocs = this.docs[collection];
  // We need to clone the snapshot, because ShareDB assumes each call to
  // getSnapshot returns a new object
  //我们需要克隆快照，因为ShareDB假设每个调用
  // getSnapshot返回一个新对象
  var doc = collectionDocs && collectionDocs[id]; 

  if (!doc && collection && getDocument) {
    doc = await getDocument(collection, id);
  }

  var snapshot;
  if (doc) {
    var data = clone(doc.data);
    var meta = includeMetadata ? clone(doc.m) : null;
    snapshot = new Snapshot(id, doc.v, doc.type, data, meta);
    const {
      m: { ctime, mtime },
      data: { ops = [] },
    } = doc;
  } else {
    var version = await this._getVersionSync(collection, id);
    snapshot = new Snapshot(id, version, null, undefined, null);
  }

  return snapshot;
};

MemoryDB.prototype._getOpLogSync = async function (collection, id) {
  const { getOpsDocument, createOpsDocument, editOpsDocument } = this.options;
  var collectionOps = this.ops[collection] || (this.ops[collection] = {});
  if (collectionOps[id]) {
    return collectionOps[id];
  }
  let ops = [];
  if (getOpsDocument) {
    ops = await getOpsDocument("o_" + collection, id)
      .then((ops) => {
        return ops || [];
      })
      .catch(() => {
        return [];
      });
  }
  collectionOps[id] = ops;

  return ops;
};

MemoryDB.prototype._getVersionSync = async function (collection, id) {
  const {
    getOpsDocument,
    createOpsDocument = () => {},
    editOpsDocument = () => {},
    getDocument = () => {},
  } = this.options;

  let v = 0;
  var collectionOps = this.ops[collection];
  if (!(collectionOps && collectionOps[id] && collectionOps[id].length)) {
    let doc = await getDocument(collection, id);
    if (doc) {
      v = doc.v;
    }
  }

  return (collectionOps && collectionOps[id] && collectionOps[id].length) || v;
};
