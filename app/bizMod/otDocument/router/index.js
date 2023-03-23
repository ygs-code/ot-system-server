/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-09-24 12:13:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/router/index.js
 */
import KoaRoute from "koa-router"; // koa 路由中间件

import { exec } from "@/db/index.js";

// import { async } from "regenerator-runtime";
// import { router as scriptRouter } from "../bizMod/script"; //scriptRouter 路由
import { router as DocumentRouter } from "../bizMod/document"; //DocumentRouter 路由
import { initTable, initTableData } from "../db";
// import { tables, CheckTable } from "../db"; //  db
class router {
  constructor(app, parentRouter, socketRoute) {
    this.app = app;
    this.router = parentRouter;
    this.socketRoute = socketRoute;
    this.init();
  }
  createRouter() {
    this.twoLevelRoute = new KoaRoute({
      prefix: "/ot-document" // 给路由统一加个前缀：
    });
    return this.twoLevelRoute;
  }
  async initTable() {
    await exec(initTable);
    // await exec(initTableData);
    console.log("OtDocument模块，mysql表初始化成功");
  }
  middleware() {
    // 处理404
    // this.app.use('/user',function* (next) {
    //     try {
    //         yield* next;
    //     } catch (e) {
    //         this.status = 500;
    //         this.body = '500';
    //     }
    //     if (parseInt(this.status) === 404) {
    //         this.body = '404';
    //     }
    // });
  }

  // 添加路由
  async addRouters() {
    // 为script模块添加路由
    // new scriptRouter(this.app, this.twoLevelRoute);
    new DocumentRouter(this.app, this.twoLevelRoute, this.socketRoute);
    // 添加路由
    this.router.use(this.twoLevelRoute.routes()); //挂载二级路由
  }
  async init() {
    await this.initTable();
    // 检查表
    // await new CheckTable(tables);
    // 创建路由
    this.createRouter();
    // 添加中间件
    this.middleware();
    // 添加路由
    this.addRouters();
  }
}

export default router;
