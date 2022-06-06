import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} from "graphql/type";
import {
  graphql,
  Source,
  validateSchema,
  parse,
  validate,
  execute,
  formatError,
  getOperationAST,
  specifiedRules,
  validationRules,
  // gql,
} from "graphql";
import httpError from "http-errors";
import {
  createToken,
  verifyToken,
  getTokenUserInfo,
  destroyToken,
} from "@/redis/index";
import { merge } from "@/utils";
import { graphqlError } from "@/constant";
import Router from "koa-router";
import { makeExecutableSchema } from "graphql-tools";
// import log4js from "log4js";
// import Home from "./home";
// import User from "./user";
import { common } from "@/middleware/index";
import { router as bizModRouter } from "@/bizMod/index";
import { unsupported, unauthorized } from "@/constant";
import { schema } from "@/graphql/schema";
import CheckGraphql from "@/graphql/CheckGraphql";
import chalk from "chalk";
// import colors from "colors-console";

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
    this.router.use(async (ctx, next) => {
      const {
        request: { header },
        cookies,
        response,
      } = ctx;
      const token = cookies.get("token") || header.token;
      await verifyToken(token)
        .then(async (value) => {
          // console.log("getTokenUserInfo then=", value);
          response.userInfo = value;
          await next();
        })
        .catch((error) => {
          console.log("getTokenUserInfo catch=", error);
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
    // console.log("serverSchema=", schema.typeDefs.schema);
    // console.log("resolvers=", schema.resolvers);
    // console.log("resolvers=", schema.resolvers);
    // 检验服务器 Schema
    CheckGraphql.validateSeverSchema({
      serverSchema: {
        schema: schema.typeDefs.schema,
        resolvers: schema.resolvers,
      },
    }).catch((error) => {
      // console.error("error=", chalk.red(error));
      // console.error("schema.typeDefs.schema=", schema.typeDefs.schema);
      // console.error("schema.resolvers=", schema.resolvers);
    });
    // 查询
    this.router.get("/data", async (ctx, next) => {
      const {
        query: { query: clientSchema = "", variables },
        response,
        request,
      } = ctx;
      const {
        body: {
          // mutation = '', variables = {}
        },
      } = request;
      console.log("clientSchema=", clientSchema);
      console.log("variables=", variables);
      // console.log("resolvers=", schema.resolvers);
      // console.log("resolvers=", schema.resolvers);
      // response.console.error("这个是红色error日志", __filename);
      // response.console.info("这个是info", __filename);
      // response.console.warn("这个是warn", __filename);
      // response.console.log("这个是log", __filename);
      // response.console.debug("这个是DEBUG", __filename);
      response.console.info(
        `[clientSchema=${clientSchema}]`,
        `[variables=${variables}]`,
        `[${__filename}]`
      );

      await CheckGraphql.init({
        context: {
          ctx,
          next,
        },
        serverSchema: {
          //输入类型
          // schemas: [
          //   schema.typeDefs.schema,
          //   // `#定义输入类型
          //   //   input UserInput {
          //   //     account: String!
          //   //     password: String!
          //   //   }
          //   //   `,
          //   // `
          //   //    type User{
          //   //       id : ID!
          //   //       email : String!
          //   //       name : String!
          //   //       phone: String!
          //   //     }

          //   //     extend type Query {
          //   //       getUser(user:UserInput!):User
          //   //     }
          //   //  `,
          // ],
          schema: schema.typeDefs.schema,
          resolvers: schema.resolvers,
          // {
          //   Mutation: {},
          //   Subscription: {},
          //   Query: {
          //     getUser: (root, parameter, source, fieldASTs) => {
          //       return {
          //         id: 1,
          //         email: "281113270@qq.com",
          //         name: "张三",
          //         phone: "18529531779",
          //       };
          //     },
          //   },
          // },
        },
        clientSchema: {
          schema: clientSchema,
          variables: variables ? JSON.parse(variables) : {},
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
              `[body=${JSON.stringify(data)}]`,
              `[${__filename}]`
            );
            response.body = data;
          }
        })
        .catch((error) => {
          // console.error("clientSchema==", clientSchema);
          // console.error("variables==", variables);
          // console.error("serverSchema==", schema.typeDefs.schema);
          // console.error("resolvers==", schema.resolvers);
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
        body: { query, mutation, variables = {} },
      } = request;
      const clientSchema = query || mutation;
      response.console.info(
        `[clientSchema=${clientSchema}]`,
        `[variables=${variables}]`,
        `[${__filename}]`
      );
      await CheckGraphql.init({
        context: {
          ctx,
          next,
        },
        serverSchema: {
          //输入类型
          // schemas: [
          //   schema.typeDefs.schema,
          //   // `#定义输入类型
          //   //   input UserInput {
          //   //     account: String!
          //   //     password: String!
          //   //   }
          //   //   `,
          //   // `
          //   //    type User{
          //   //       id : ID!
          //   //       email : String!
          //   //       name : String!
          //   //       phone: String!
          //   //     }

          //   //     extend type Query {
          //   //       getUser(user:UserInput!):User
          //   //     }
          //   //  `,
          // ],
          schema: schema.typeDefs.schema,
          resolvers: schema.resolvers,
          // {
          //   Mutation: {},
          //   Subscription: {},
          //   Query: {
          //     getUser: (root, parameter, source, fieldASTs) => {
          //       return {
          //         id: 1,
          //         email: "281113270@qq.com",
          //         name: "张三",
          //         phone: "18529531779",
          //       };
          //     },
          //   },
          // },
        },
        clientSchema: {
          schema: clientSchema,
          variables: variables || {},
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
              `[body=${JSON.stringify(data)}]`,
              `[${__filename}]`
            );
            response.body = data;
          }
        })
        .catch((error) => {
          // console.error("clientSchema==", clientSchema);
          // console.error("variables==", variables);
          // console.error("serverSchema==", schema.typeDefs.schema);
          // console.error("resolvers==", schema.resolvers);
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
