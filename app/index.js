/*
 * @Author: your name
 * @Date: 2020-12-29 09:32:02
 * @LastEditTime: 2022-04-22 20:06:38
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/index.js
 */
import "@babel/polyfill";
import koa from "koa";
import { promise } from "./utils";
import { CheckTable, connection, exec, addUser } from "./db/index.js";
import { Redis } from "./redis";
import Route from "./routes/index";
import kill from "kill-port";
import { port } from "./config";
// import myVue from 'myVue';

class App {
  constructor() {
    //创建node实例
    this.app = new koa();
    this.init();
  }
  async init() {
    // redis链接
    await this.connectRedis();
    // 数据库连接
    await this.connectSql();
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
        console.log("Redis 链接错误");
        reject();
      });
    });
  }
  async connectSql() {
    await promise((reslove, reject) => {
      connection.connect((err) => {
        if (err) {
          console.log("数据库连失败");
          reject();
          throw err;
        }
        // new CheckTable();
        console.log("mysql数据库连接成功");
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
  addRoute() {
    // 导入路由
    new Route(this.app);
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
