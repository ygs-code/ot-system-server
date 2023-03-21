/*
 * @Author: your name
 * @Date: 2020-12-29 09:32:02
 * @LastEditTime: 2022-06-08 18:24:46
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/index.js
 */
import "@babel/polyfill";

import { Server } from "http";
import Koa from "koa";

import { port } from "./config";
import { connection, exec } from "./db/index.js";
import initTable from "./db/sql/initTable.sql";
import { Redis } from "./redis";
import Route from "./routes/index";
import { promise } from "./utils";

class App {
  constructor() {
    //创建node实例
    this.app = new Koa();
    this.server = new Server(this.app);
    this.init();
  }
  async init() {
    // redis链接
    await this.connectRedis();
    // 数据库连接
    await this.connectSql();

    // // 初始化表
    // await this.initTable();
    //加载路由
    this.addRoute();
    // 设置监听端口
    this.listen();
  }
  async connectRedis() {
    await promise((reslove, reject) => {
      Redis.connect(() => {
        console.log("Redis 链接成功");
        reslove();
      });
      Redis.error(() => {
        console.log("Redis 发生错误");
        reject();
      });
    });
  }
  async connectSql() {
    await promise((reslove, reject) => {
      connection.connect((err) => {
        if (err) {
          console.log("Mysql数据库连失败");
          reject();
          throw err;
        }
        console.log("Mysql数据库连接成功");
        reslove();
      });
      //   connection.end((err) => {
      //     if (err) {
      //       console.log("数据库连失败");
      //       reject();
      //       throw err;
      //     }
      //   });
    });
  }
  async initTable() {
    await exec(initTable);
    console.log("Mysql表初始化成功");
  }
  addRoute() {
    const socketCallback = (data) => {
      console.log("data==", data);
    };
    // 导入路由
    new Route(this.app, socketCallback);
  }

  addSocket() {
    // https://www.cnblogs.com/huenchao/p/6234550.html  文档
    this.server.on("upgrade", (request, socket, head) => {
      // const pathname = url.parse(request.url).pathname;
      // // console.log('request.url==', request.url);
      // const params = getUrlParams(request.url) || {}; // 如果没有id则不给连接
      // const { documentId, documentType } = params; // 如果没有id则不给连接

      // console.log('params=========', params);

      socket.on("end", () => {
        if (!socket.destroyed) {
          if (socket.destroy) {
            socket.destroy();
          }
        }
      });

      // if (!documentId || !documentType) {
      //   return socket.end();
      // }
      // if (pathname === "/sharedb") {
      //   wssShareDB.handleUpgrade(request, socket, head, (ws) => {
      //     // 拿到参数 做拦截
      //     wssShareDB.emit("connection", ws, request, params);
      //   });
      // } else {
      //   socket.end();
      // }
    });
  }

  listen() {
    // try {
    //    kill(port, "tcp");
    // } catch (e) {}

    this.server = this.app.listen(port, () => {
      console.log(`服务器启动成功:http://localhost:${port}/`);
    });

    this.server.setTimeout(5 * 60 * 1000);
  }
}

export default new App();
