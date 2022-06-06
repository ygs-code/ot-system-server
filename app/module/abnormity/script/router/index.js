import controller from "../controller";
import koaRoute from "koa-router"; // koa 路由中间件

class router {
  constructor(app, rootRouter) {
    this.app = app;
    this.router = rootRouter;
    this.init();
  }
  createRouter() {
    this.secondaryRoute = new koaRoute({
      prefix: "/user", // 给路由统一加个前缀：
    });
    return this.secondaryRoute;
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
    // 添加路由
    this.registered();
    this.login();
    this.router.use(this.secondaryRoute.routes()); //挂载二级路由
  }
  init() {
    // 创建路由
    this.createRouter();
    // 添加中间件
    this.middleware();
    // 添加路由
    this.addRouters();
  }
  registered() {
    // 添加 接口
    // this.secondaryRoute.post("/register", controller.add);
  }
  login() {
    // 添加 接口
    // this.secondaryRoute.post("/login", controller.login);
  }
}

export default router;
