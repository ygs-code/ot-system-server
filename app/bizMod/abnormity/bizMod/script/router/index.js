import controller from "../controller";
import koaRoute from "koa-router"; // koa 路由中间件

class router {
  constructor(app, parentRouter) {
    this.app = app;
    this.router = parentRouter;
    this.init();
  }
  createRouter() {
    this.threeLevelRoute = new koaRoute({
      prefix: "/script", // 给路由统一加个前缀：
    });
    return this.threeLevelRoute;
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
  addRouters() {
    // 注册路由
    this.query();
    this.add();
    this.edit();
    this.router.use(this.threeLevelRoute.routes()); //挂载二级路由
  }
  init() {
    // 创建路由
    this.createRouter();
    // 添加中间件
    this.middleware();
    // 添加路由
    this.addRouters();
  }
  query() {
    
    // 添加 接口
    this.threeLevelRoute.get("/query", controller.query);
  }
  add() {
    // 添加 接口
    this.threeLevelRoute.post("/add", controller.add);
  }
  edit() {
    // 添加 接口
     this.threeLevelRoute.post("/edit", controller.edit);
  }
}

export default router;
