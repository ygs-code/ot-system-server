/*
 * @Author: your name
 * @Date: 2020-12-29 09:32:02
 * @LastEditTime: 2022-06-08 18:24:46
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/index.js
 */
import "@babel/polyfill";

import { config } from "dotenv";
import { Server } from "http";
import Koa from "koa";
import url from "url";

// import { port } from "./config";
import { connection, exec } from "./db/index.js";
import initTable from "./db/sql/initTable.sql";
import { Redis } from "./redis";
import Route from "./routes/index";
import { promise } from "./utils";

const {
  parsed: { port }
} = config();

class App {
  constructor() {
    //创建node实例
    this.app = new Koa();
    this.server = new Server(this.app);
    this.sockets = [];
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

    // 加载Socket
    this.addSocket();

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
  socketRoute(path, callback) {
    this.sockets[path] = callback;
    console.log("this.sockets===", this.sockets);
  }
  addRoute() {
    // 导入路由
    new Route(this.app, this.server, (...ags) => {
      this.socketRoute(...ags);
    });
  }
  // 获取回调地址参数
  getUrlParams(url) {
    // 通过 ? 分割获取后面的参数字符串
    let urlStr = url.split("?")[1] || "";

    // 创建空对象存储参数
    let obj = {};
    // 再通过 & 将每一个参数单独分割出来
    let paramsArr = urlStr.split("&");
    for (let i = 0, len = paramsArr.length; i < len; i++) {
      // 再通过 = 将每一个参数分割为 key:value 的形式
      let arr = paramsArr[i].split("=");
      obj[arr[0]] = arr[1];
    }
    return obj;
  }

  addSocket() {
    console.log("addSocket======");
    // console.log("this.server======", this.server);
    // https://www.cnblogs.com/huenchao/p/6234550.html  文档

    this.server.on("upgrade", (request, socket, head) => {
      console.log("upgrade=========");
      const pathname = url.parse(request.url).pathname;
      // // console.log('request.url==', request.url);
      const params = this.getUrlParams(request.url) || {}; // 如果没有id则不给连接
      // const { documentId, documentType } = params; // 如果没有id则不给连接

      socket.on("end", () => {
        if (!socket.destroyed) {
          if (socket.destroy) {
            socket.destroy();
          }
        }
      });

      if (pathname in this.sockets) {
        this.sockets[pathname]({ request, socket, head, params });
      } else {
        socket.end();
      }

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

    this.server.on("clientError", (err, socket) => {
      socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
    });

    this.server.on("request", function (req, res) {
      // 3.为服务器实例绑定 request 事件，监听客户端请求。
      console.log("request======");
    });

    //监听服务器连接
    this.server.on("connect", function (socket) {
      console.log("connect=======");
      //客户端与服务器创立链接时触发connection事件
    });

    //监听服务器连接
    this.server.on("connection", function (socket) {
      console.log("connection=======");
      //客户端与服务器创立链接时触发connection事件
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
