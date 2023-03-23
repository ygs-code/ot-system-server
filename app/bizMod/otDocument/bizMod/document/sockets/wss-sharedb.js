var WebSocket = require("ws");
var WebSocketJSONStream = require("websocket-json-stream");
var ShareDBLogger = require("sharedb-logger");
var db = require("./sharedb-server");
var debug = require("debug")("quill-sharedb-cursors:sharedb");
let type = require("rich-text").type;
var {
  createOpsDocument,
  editOpsDocument,
  getOpsDocument,
  createDocument,
  editDocument,
  getDocument,
  removeDocument
} = require("../db/mysql/index.js");
var { RedisClass, Redis, redisClient, expires } = require("../redis");
// var {
//     createDocument,
//     editDocument,
//     getDocument,
//     removeDocument,
// } = require('../db/mysql/index.js');
const { parseInt } = require("lodash");
const backend = db.backend;

class WssSharedb {
  constructor(server) {
    this.server = server;
    this.init();
  }
  init() {
    this.createWss();
    this.onConnection();
    this.onPing();
  }
  createWss() {
    this.wss = new WebSocket.Server({
      noServer: true
    });
  }
  onConnection() {
    this.wss.on("connection", (ws, request, params) => {
      // generate an id for the socket
      ws.isAlive = true;
      //  发送流
      // console.log("documentType==", documentType);
      // console.log("documentId==", documentId);
      //   创建文档
      this.createDoc(() => {}, params);

      ws.on("pong", function (data, flags) {
        ws.isAlive = true;
      });

      ws.on("error", function (error) {
        debug("Client connection errored (%s). (Error: %s)", ws.id, error);
      });
      // 创建链接流
      var stream = new WebSocketJSONStream(ws);
      backend.listen(stream);
    });
  }
  createDoc(callback, params) {
    const { documentId, documentType, documentTitle, userName, userId } =
      params;

    // console.log("options====================", params);
    // backend.addProjection('names', 'users', {firstName: true, lastName: true})

    backend.use("commit", (context, next) => {
      // // agent.custom is usually set in the 'connection' hook
      // const userId = context.agent.custom.userId;
      // const id = context.id;
      // // 如果不可以提交
      // if (!userCanChangeDoc(userId, id)) {
      //   return next(new Error("Unauthorized"));
      // }
      // console.log("context op=", context.op);
      next();
    });

    backend.on("submitRequestEnd", () => {
      // requestsInProgress--
    });

    // backend.use('afterWrite', (context, next) => {
    //   cache.set(context.collection, context.id, context.snapshot)
    //   next()
    // })

    backend.use("query", (context, next) => {
      // console.log('context==',context)
      // Set our query to only listen for changes on our user-specific channel
      // context.channel = userChannel(context)
      next();
    });

    // 合并
    backend.use("apply", (context, next) => {
      // agent.custom is usually set in the 'connection' hook
      // const userId = context.agent.custom.userId
      // const ownerId = context.snapshot.m.ownerId
      // if (userId !== ownerId) {
      //   return next(new Error('Unauthorized'))
      // }
      next();
    });

    // const sharedbLogger = new ShareDBLogger(backend);
    // 获取 连接对象
    var connection = backend.connect();
    // 获取文档
    var doc = connection.get(documentType, documentId);
    //  更新文档
    doc.fetch(async (err) => {
      if (err) throw err;
      if (doc.type === null) {
        let document = await Redis.get(`${documentType}.${documentId}`)
          .then((data) => {
            return [JSON.parse(data)];
          })
          .catch(async (error) => {
            let data = await getDocument(documentType, documentId);
            return data;
          });
        if (document === null || document === undefined) {
          // 创建一个空的文档
          doc.create(
            {
              op: {
                ops: [
                  {
                    insert: ""
                  }
                ]
              },
              data: {
                title: documentTitle,
                userName,
                userId
              }
            },
            "rich-text"
          );
        }
        return;
      }
      // 服务端
      callback();
    });
  }
  onPing() {
    // Sockets Ping, Keep Alive
    setInterval(() => {
      this.wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
          return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping(); // 发送给客户端
      });
    }, 30000);
  }
}
module.exports = WssSharedb;
