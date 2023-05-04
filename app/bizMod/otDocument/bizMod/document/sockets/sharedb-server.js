import moment from "moment";
import { type } from "rich-text";

import {
  createDocument,
  createOpsDocument,
  editDocument,
  editOpsDocument,
  getDocument,
  getOpsDocument,
  removeDocument
} from "@/bizMod/otDocument/db/index.js";
import {
  getDocument as getRedisDocument,
  setDocument as setRedisDocument
} from "@/bizMod/otDocument/redis/index.js";
import MemoryDB from "@/modules/otServe/lib/db/index.js";
import ShareDB from "@/modules/otServe/lib/server/index.js";
import { Redis } from "@/redis";
import { stabilization, throttle } from "@/utils";

// var { RedisClass, Redis, redisClient, expires } = require("../redis");

// 设置10秒钟把redis数据更新到mysql中
const updateSqlFrequency = 1000;
let documentThrottle = throttle();
let oDocumentThrottle = throttle();

class DB {
  constructor() {
    this.init();
    this.timer = null;
    this.oTimer = null;
  }
  init() {
    const {
      types: { register }
    } = ShareDB;
    register(type);
    this.createShareDB();
  }

  async updateSqlDocument(table, flag) {
    let keys = await Redis.getKeys(`${table}.*`);
    for (let key of keys) {
      let data = await getRedisDocument(key);
      await editDocument(table, JSON.parse(data));
    }

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
      let data = await getRedisDocument(key);

      await editOpsDocument(table, JSON.parse(data));
    }
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
        editOpsDocument: async (table, { id, ops, userId }) => {
          if (!userId) {
            return false;
          }
          ops = JSON.stringify(ops);

          let data = await setRedisDocument(
            `${table}.${id}`,
            JSON.stringify({ id, ops, update_by: userId })
          )
            .then(() => {
              // console.log("ops写入成功");
              oDocumentThrottle(updateSqlFrequency, () => {
                this.updateSqlODocument(table);
              });
            })
            .catch(async (error) => {
              // console.log("ops写入错误");
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

        // },
        editDocument: async (table, data) => {
          const {
            userId: user_id,
            id,
            v,
            type,
            data: { ops = [] },
            m: { ctime, mtime }
          } = data;

          const { insert: content } = ops.find((item) => {
            const { insert } = item;
            return insert !== undefined;
          }) || {
            insert: ""
          };

          const create_time = moment(ctime).format("YYYY-MM-DD HH:mm:ss");
          const update_time = moment(mtime).format("YYYY-MM-DD HH:mm:ss");

          if (id && user_id && type) {
            let data = await setRedisDocument(
              `${table}.${id}`,
              JSON.stringify({
                id,
                // create_by: user_id,
                update_by: user_id,
                // title,
                v,
                type,
                content,
                create_time,
                update_time
              })
            )
              .then(() => {
                // console.log("文档写入成功");
                documentThrottle(updateSqlFrequency, () => {
                  this.updateSqlDocument(table);
                });
              })
              .catch(async (error) => {
                // console.log("文档写入错误");
                // await editDocument(table, {
                //     id,
                //     user_id,
                //     // title,
                //     v,
                //     type,
                //     content,
                //     create_time,
                //     update_time,
                // });
              });
          }
        },

        // 创建文档
        createDocument: async (table, data = {}) => {
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
              await setRedisDocument(
                `${table}.${id}`,
                JSON.stringify({
                  id,
                  create_by: user_id,
                  update_by: user_id,
                  title,
                  v,
                  type,
                  content,
                  create_time,
                  update_time
                })
              ),
              await createDocument(table, {
                id,
                create_by: user_id,
                update_by: user_id,
                title,
                v,
                type,
                content,
                create_time,
                update_time
              }),
              // 创建op
              await setRedisDocument(
                `o_${table}.${id}`,
                JSON.stringify({
                  id,
                  create_by: user_id,
                  update_by: user_id,
                  ops: JSON.stringify([])
                })
              ),
              await createOpsDocument(`o_${table}`, {
                id,
                create_by: user_id,
                update_by: user_id,
                ops: JSON.stringify([])
              })
            ]);
          }
        }
      })
    });
  }
}

export default new DB();
