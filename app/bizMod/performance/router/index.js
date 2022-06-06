import koaRoute from "koa-router"; // koa 路由中间件
import {router as networkRouter} from "../bizMod/network"; //networkRouter 路由  
import {router as downloadRouter} from "../bizMod/download"; //downloadRouter 路由  

class router {
  constructor(app, parentRouter) {
    this.app = app;
    this.router = parentRouter;
    this.init();
  }
  createRouter() {
    this.twoLevelRoute = new koaRoute({
      prefix: "/performance", // 给路由统一加个前缀：
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
  // 添加路由
  addRouters() {
    // 为script模块添加路由
    new networkRouter(this.app,this.twoLevelRoute);
    new downloadRouter(this.app,this.twoLevelRoute);

   
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