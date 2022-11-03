/*
 * @Author: your name
 * @Date: 2020-12-29 09:32:02
 * @LastEditTime: 2022-06-08 18:24:46
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/index.js
 */
import "@babel/polyfill";
import koa from "koa";
import { promise } from "./utils";
import {  connection, exec, addUser } from "./db/index.js";
import initTable from "./db/sql/initTable.sql";
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
