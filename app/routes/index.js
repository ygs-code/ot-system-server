import {
  createToken,
  verifyToken,
  getTokenUserInfo,
  destroyToken,
} from "@/redis/index";
import _ from "lodash";
import { graphqlError } from "@/constant";
import Router from "koa-router";
import { common } from "@/middleware/index";
import { router as bizModRouter } from "@/bizMod/index";
import { unsupported, unauthorized } from "@/constant";
import { validateGraphql } from "@/graphql";
import noVerifyToken from "./noVerifyToken";
class Route {
  constructor(app) {
    this.app = app;
    // this.router = router;
    this.init();
  }
  createRouter() {
    this.router = new Router({
      prefix: "/api", // 给路由统一加个前缀：
    });
  }
  // 添加中间件
  middleware() {
    // 添加 404 500 中间件
    common(this.app, this.router);
  }

  verifyToken() {
    this.router.use("/data", async (ctx, next) => {
      let {
        request,
        query: { query: clientSchema = "", operationName: queryOperationName },
        cookies,
        response,
        method,
      } = ctx;
      const {
        body: { query, mutation, operationName: bodyOperationName },
        header,
      } = request;

      method = method.toUpperCase();

      let operationName =
        method === "GET" ? queryOperationName : bodyOperationName;

      if (!operationName) {
        response.console.error("客户端graphql请求错误:缺少operationName参数");
        return (response.body = {
          ...graphqlError,
          message: "客户端graphql请求错误:缺少operationName参数",
        });
      }

      //过滤不要校验token的接口
      if (noVerifyToken.includes(operationName)) {
        return await next();
      }

      const token = cookies.get("token") || header.token;
      await verifyToken(token)
        .then(async (value) => {
          console.log('value======',value)
          response.userInfo = value;
          await next();
        })
        .catch((error) => {
          response.userInfo = null;
          ctx.response.body = {
            ...unauthorized,
            message: "登录回话已过期，请重新登录",
          };
        });
    });
  }
  // 添加路由
  async addRouters() {
    bizModRouter(this.app, this.router);

    //验证Token
    this.verifyToken();

    // 查询
    this.router.get("/data", async (ctx, next) => {
      let errorMessage = "";
      const {
        query: { query, variables = "{}", operationName },
        response,
        request,
      } = ctx;
      const {
        body: {
          // mutation = '', variables = {}
        },
      } = request;
      let clientSchema = query;

      // response.console.error("这个是红色error日志", __filename);
      // response.console.info("这个是info", __filename);
      // response.console.warn("这个是warn", __filename);
      // response.console.log("这个是log", __filename);
      // response.console.debug("这个是DEBUG", __filename);

      if (!clientSchema) {
        errorMessage = "客户端graphql请求错误缺少query参数";
        response.console.error(errorMessage);
        return (response.body = {
          ...graphqlError,
          message: errorMessage,
        });
      }

      response.console.info(
        `\n客户端graphql请求:\n [operationName:${operationName}]\n [clientSchema:${clientSchema}]\n [variables:${JSON.stringify(
          variables
        )}]\n`
      );

      console.log('variables==',variables)

      await validateGraphql({
        rootValue: {
          ctx,
          next,
        },
        clientSchema: {
          schema: clientSchema,
          variables: JSON.parse(variables),
          operationName,
        },
      })
        .then((data) => {
          const { errors } = data;
          if (errors) {
            response.body = {
              ...graphqlError,
              errors,
            };
          } else {
            response.console.log(
              `\n 客户端graphql请求成功:\n [operationName:${operationName}]\n [clientSchema:${clientSchema}]\n [variables:${JSON.stringify(
                variables
              )}]\n [body:${JSON.stringify(data)}]
              `
            );
            response.body = data;
          }
        })
        .catch((error) => {
          errorMessage = `\n graphql 校验语法错误：\n[operationName:${operationName}]\n [clientSchema:${clientSchema}]\n [variables:${JSON.stringify(
            variables
          )}]\n ${error} `;
          response.console.error(errorMessage);
          return (response.body = {
            ...graphqlError,
            message: errorMessage,
          });
        });
    });
    //变异
    this.router.post("/data", async (ctx, next) => {
      const {
        // query: { query: clientSchema = "", variables = {} },
        response,
        request,
      } = ctx;
      const {
        body: { query, mutation, variables = {}, operationName },
      } = request;
      if (!mutation) {
        response.console.error("客户端graphql请求错误缺少mutation参数");
        return (response.body = {
          ...graphqlError,
          message: "客户端graphql请求错误缺少mutation参数",
        });
      }

      const clientSchema = mutation;

      response.console.info(
        `\n 客户端graphql请求:\n [operationName:${operationName}]\n [clientSchema:${clientSchema}]\n [variables:${JSON.stringify(
          variables
        )}]`
      );

      await validateGraphql({
        rootValue: {
          ctx,
          next,
        },
        clientSchema: {
          schema: clientSchema,
          variables,
          operationName,
        },
      })
        .then((data) => {
          const { errors } = data;

          if (errors) {
            response.body = {
              ...graphqlError,
              errors,
            };
          } else {
            response.console.log(
              `\n 客户端graphql请求成功:\n [operationName:${operationName}]\n [clientSchema:${clientSchema}]\n [variables:${JSON.stringify(
                variables
              )}]\n [body:${JSON.stringify(data)}]
              `
            );
            response.body = data;
          }
        })
        .catch((error) => {
          response.console.error(
            `\n graphql 校验语法错误:\n [operationName:${operationName}]\n [clientSchema:${clientSchema}]\n [variables:${JSON.stringify(
              variables
            )}]\n ${error.toString()} `
          );

          response.body = {
            ...graphqlError,
            errors: error.toString(),
          };
        });
    });

    // 挂载路由中间件
    this.app.use(this.router.routes()).use(this.router.allowedMethods());
  }
  init() {
    // 添加中间件
    this.middleware();
    //创建路由
    this.createRouter();

    // 添加路由
    this.addRouters();
  }
}

export default Route;
