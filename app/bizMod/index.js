/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2022-06-08 18:28:56
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/bizMod/index.js
 */
// import { checkSchema } from '@/utils'
// import {
//   // 动态导入模块
//   router as abnormityRouter,
//   schema as abnormitySchema,
// } from "./abnormity";
// import {
//   // 动态导入模块
//   router as performanceRouter,
//   schema as performanceSchema,
// } from "./performance";

import {
  // 动态导入模块
  router as setRouter,
  schema as setSchema,
} from './set'

// 动态导入模块
// import {
//   router as projectListRouter,
//   schema as projectListSchema,
// } from "./projectList";
// import { router as menuRouter, schema as menuSchema } from "./menu";

// const checkSchemas = checkSchema();
// export const schema = (() => {
//   let typeDefs = {
//     schema: "",
//     schemas: [],
//   };
//   let resolvers = {
//     Mutation: {},
//     Query: {},
//     Subscription: {},
//   };

//   // 动态添加模块
//   const schemas = {
//     ...abnormitySchema,
//     ...performanceSchema,
//     ...projectListSchema,
//     ...setSchema,
//     ...menuSchema,
//   };

//   const schemaKeys = Object.keys(schemas);

//   for (let key of schemaKeys) {
//     typeDefs.schema += schemas[key].typeDefs.schema + "\n";
//     typeDefs.schemas.push(schemas[key].typeDefs.schema);
//     checkSchemas(resolvers, schemas[key].resolvers);
//   }

//   return {
//     typeDefs,
//     resolvers,
//   };
// })();

console.log('setSchema=======', setSchema)

export const schema = (() => {
  // 动态添加模块
  let schemas = {
    // ...abnormitySchema,
    // ...performanceSchema,
    // ...projectListSchema,
    ...setSchema,
    // ...menuSchema,
  }

  console.log('schemas======', schemas)

  let newSchemas = []
  for (let key in schemas) {
    if (schemas.hasOwnProperty(key)) {
      newSchemas.push(schemas[key])
    }
  }
  console.log('newSchemas=', newSchemas)
  return newSchemas
})()

export const router = (app, router) => {
  let routers = {
    // abnormityRouter,
    // performanceRouter,
    // projectListRouter,
    // menuRouter,
    setRouter,
  }
  // 动态添加模块
  for (let key in routers) {
    if (routers.hasOwnProperty(key)) {
      new routers[key](app, router)
    }
  }

  // new abnormityRouter(app, router);
  // new performanceRouter(app, router);
  // new setRouter(app, router)
  // new projectListRouter(app, router);
  // new menuRouter(app, router);
}
