var ShareDB = require("../modules/sharedb");
var MemoryDB = require("../db/memory");
var moment = require("moment");
var { throttle, stabilization } = require("utils");
var {
  createOpsDocument,
  editOpsDocument,
  getOpsDocument,
  createDocument,
  editDocument,
  getDocument,
  removeDocument
} = require("../db/mysql/index.js");
let type = require("rich-text").type;
ShareDB.types.register(type);

var { RedisClass, Redis, redisClient, expires } = require("../redis");
// 设置10秒钟把redis数据更新到mysql中
const updateSqlFrequency = 10000;
let documentThrottle = throttle();
let oDocumentThrottle = throttle();

class DB {
  constructor() {
    this.init();
    this.timer = null;
    this.oTimer = null;
  }
  init() {
    this.createShareDB();
  }

  async updateSqlDocument(table, flag) {
    let keys = await Redis.getKeys(`${table}.*`);
    for (let key of keys) {
      let data = await Redis.get(key);
      await editDocument(table, JSON.parse(data));
    }
    // console.log("updateSqlDocument==", keys);
    clearTimeout(this.timer);
    if (flag) {
      return false;
    }
    this.timer = setTimeout(() => {
      this.updateSqlDocument(table, true);
    }, updateSqlFrequency);
  }
  async updateSqlODocument(table, flag) {
    let keys = await Redis.getKeys(`${table}.*`);
    for (let key of keys) {
      let data = await Redis.get(key);
      await editOpsDocument(table, JSON.parse(data));
    }

    // console.log("updateSqlODocument==", keys);
    clearTimeout(this.oTimer);
    if (flag) {
      return false;
    }
    this.oTimer = setTimeout(() => {
      this.updateSqlODocument(table, true);
    }, updateSqlFrequency);
  }

  createShareDB() {
    this.backend = new ShareDB({
      db: new MemoryDB({
        getOpsDocument: async (table, id, ops) => {
          let data = await Redis.get(`${table}.${id}`)
            .then((data) => {
              return [JSON.parse(data)];
            })
            .catch(async (error) => {
              let data = await getOpsDocument(table, id);
              return data;
            });
          if (data.length) {
            data = JSON.parse(data[0].ops);
          }
          // console.log("getOpsDocument==");
          return data;
        },
        //   createOpsDocument: async (table, id, ops) => {
        //     // console.log('createOpsDocument==')
        //     let data = await Redis.set(`${table}.${id}`, ops, {
        //       pexpire: expires,
        //     })
        //       .then(() => {
        //          console.log("ops写入成功");

        //         throttle(updateSqlFrequency, () => {
        //           this.updateSqlODocument(table);
        //         })();
        //       })
        //       .catch(async (error) => {
        //         console.log("ops写入失败");
        //         await createOpsDocument(table, { id, ops });
        //       });
        //   },
        editOpsDocument: async (table, id, ops) => {
          ops = JSON.stringify(ops);
          // console.log('editOpsDocument==');
          let data = await Redis.set(
            `${table}.${id}`,
            JSON.stringify({ id, ops }),
            {
              pexpire: expires
            }
          )
            .then(() => {
              oDocumentThrottle(updateSqlFrequency, () => {
                this.updateSqlODocument(table);
              });
            })
            .catch(async (error) => {
              console.log("ops写入错误");
              let data = await editOpsDocument(table, {
                id,
                ops
              });
              return data;
            });
        },

        getDocument: async (table, id) => {
          // console.log('getDocument==');
          let data = await Redis.get(`${table}.${id}`)
            .then((data) => {
              return [JSON.parse(data)];
            })
            .catch(async (error) => {
              let data = await getDocument(table, id);
              return data;
            });

          if (data.length) {
            const { id, title, v, type, content, createTime, updateTime } =
              data[0];

            data = {
              id,
              v,
              type,
              data: { ops: [{ insert: content }] },
              m: { ctime: createTime, mtime: updateTime }
            };
          } else {
            data = null;
          }
          // console.log("getDocument==", data);
          return data;
        },
        // removeDocument(data) {
        //     console.log('removeDocument=====', data);
        // },
        editDocument: async (table, data) => {
          // console.log("editDocument==");
          const {
            userId: user_id,
            id,
            v,
            type,
            data: {
              ops: [{ insert: content }]
            },
            m: { ctime, mtime }
          } = data;

          const create_time = moment(ctime).format("YYYY-MM-DD HH:mm:ss");
          const update_time = moment(mtime).format("YYYY-MM-DD HH:mm:ss");

          if (id && user_id && type) {
            let data = await Redis.set(
              `${table}.${id}`,
              JSON.stringify({
                id,
                user_id,
                // title,
                v,
                type,
                content,
                create_time,
                update_time
              }),
              {
                pexpire: expires
              }
            )
              .then(() => {
                //   console.log("文档写入成功");
                documentThrottle(updateSqlFrequency, () => {
                  this.updateSqlDocument(table);
                });
              })
              .catch(async (error) => {
                console.log("文档写入错误");
                await editDocument(table, {
                  id,
                  user_id,
                  // title,
                  v,
                  type,
                  content,
                  create_time,
                  update_time
                });
              });
          }
        },

        // 创建文档
        createDocument: async (table, data = {}) => {
          // console.log('createDocument=======');
          const {
            userId: user_id,
            title,
            id,
            v,
            type,
            data: {
              ops: [{ insert: content }]
            },
            m: { ctime, mtime }
          } = data;
          const create_time = moment(ctime).format("YYYY-MM-DD HH:mm:ss");
          const update_time = moment(mtime).format("YYYY-MM-DD HH:mm:ss");

          if (id && user_id && type) {
            await Promise.all([
              await Redis.set(
                `${table}.${id}`,
                JSON.stringify({
                  id,
                  user_id,
                  title,
                  v,
                  type,
                  content,
                  create_time,
                  update_time
                }),
                {
                  pexpire: expires
                }
              ),
              await createDocument(table, {
                id,
                user_id,
                title,
                v,
                type,
                content,
                create_time,
                update_time
              }),
              // 创建op
              await Redis.set(
                `o_${table}.${id}`,
                JSON.stringify({ id, ops: JSON.stringify([]) }),
                {
                  pexpire: expires
                }
              ),
              await createOpsDocument(`o_${table}`, {
                id,
                ops: JSON.stringify([])
              })
            ]);
          }
        }
      })
    });
  }
}

module.exports = new DB();
