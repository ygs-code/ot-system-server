/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-09-24 15:39:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/index.js
 */
import { checkSchema } from "@/utils";
import {
  // 动态导入模块
  router as abnormityRouter,
  schema as abnormitySchema,
} from "./abnormity";
import {
  // 动态导入模块
  router as performanceRouter,
  schema as performanceSchema,
} from "./performance";

import {
  // 动态导入模块
  router as setRouter,
  schema as setSchema,
} from "./set";

// 动态导入模块
import {
  router as projectListRouter,
  schema as projectListSchema,
} from "./projectList";
import { router as menuRouter, schema as menuSchema } from "./menu";

console.log("projectListRouter=====", projectListRouter);
console.log("projectListSchema=====", projectListSchema);
console.log("abnormitySchema=====", abnormitySchema);

const checkSchemas = checkSchema();
export const schema = (() => {
  let typeDefs = {
    schema: "",
    schemas: [],
  };
  let resolvers = {
    Mutation: {},
    Query: {},
    Subscription: {},
  };

  // 动态添加模块
  const schemas = {
    ...abnormitySchema,
    ...performanceSchema,
    ...projectListSchema,
    ...setSchema,
    ...menuSchema,
  };

  const schemaKeys = Object.keys(schemas);

  for (let key of schemaKeys) {
    typeDefs.schema += schemas[key].typeDefs.schema + "\n";
    typeDefs.schemas.push(schemas[key].typeDefs.schema);
    checkSchemas(resolvers, schemas[key].resolvers);
  }

  return {
    typeDefs,
    resolvers,
  };
})();
export const router = (app, router) => {
  // 动态添加模块
  new abnormityRouter(app, router);
  new performanceRouter(app, router);
  new setRouter(app, router);
  new projectListRouter(app, router);
  new menuRouter(app, router);
};
