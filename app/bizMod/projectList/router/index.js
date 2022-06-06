/*
 * @Author: your name
 * @Date: 2021-09-23 18:01:29
 * @LastEditTime: 2021-09-24 11:19:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/index/router/index.js
 */
import koaRoute from "koa-router"; // koa 路由中间件
import controller from "../controller"; // koa 路由中间件
class router {
  constructor(app, parentRouter) {
    this.app = app;
    this.router = parentRouter;
    this.init();
  }
  createRouter() {
    this.twoLevelRoute = new koaRoute({
      prefix: "/index", // 给路由统一加个前缀：
    });
    return this.twoLevelRoute;
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

  //新增
  add() {
    // 添加 接口
    this.twoLevelRoute.get("/add", controller.add);
  }
  edit() {
    // 编辑 接口
    this.twoLevelRoute.get("/edit", controller.edit);
  }
  query() {
    // 查询 接口
    this.twoLevelRoute.get("/query", controller.query);
  }
  remove() {
    // 删除 接口
    this.twoLevelRoute.get("/remove", controller.remove);
  }

  // 添加路由
  addRouters() {
    // 为script模块添加路由
    // new scriptRouter(this.app,this.twoLevelRoute);
    // new userRouter(this.app,this.twoLevelRoute);
    // 添加路由
    this.router.use(this.twoLevelRoute.routes()); //挂载二级路由
  }
  init() {
    // 创建路由
    this.createRouter();
    // 添加中间件
    this.middleware();
    // 添加路由
    this.addRouters();
  }
}

export default router;
