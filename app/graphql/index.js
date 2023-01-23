/*
 * @Date: 2022-06-06 16:14:24
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-06-08 19:19:34
 * @FilePath: /Blogs/BlogsServer/app/graphql/index.js
 * @Description:
 */
//  会员模块
// import { default as baseSchema } from './schema'
// 数组
import { schema as bizModSchema } from "../bizMod";
import { validateGraphql } from "./graphql-modules-validate/esm/ValidateGraphql";
import { default as schema } from "./schema";

const $validateGraphql = validateGraphql({
  serverRootSchema: `

  type Animal {
    species: String
  }
  
  extend type Animal {
    owner: String
    name: String
  }

 #这本身不是继承；而是继承。您只能扩展基本类型，而不能基于它创建新类型。注意，新类型没有名称。现有Animal类型已扩展。
 
  
  """
    接口
  """
  interface Foo {
    id: ID!
    foo: Int!
  }
  """
    实现接口
  """
  type Bar implements Foo  {
    id: ID!
    foo: Int!
    bar: Int!
  }
  
 

  
      """
      基础数据
      """
       type baseData {
            dummy: String
       }
        """
        基础信息
        """
        interface BaseInfo {
                """
                请求状态
                """
                code: Int
                """
                Data数据
                """
                data: baseData
                """
                请求信息
                """
                message: String
        }




      type Query {
          dummy: String
      }
      type Mutation {
          dummy: String
      }
      type Subscription {
          dummy: String
      }
      schema {
          query: Query
          mutation: Mutation
          subscription: Subscription
      }
  `,
  lang: "zh-CN",
  modules: [
    ...bizModSchema,
    ...schema
    // {
    //   id: 'user2-module', // id不能与其他模块重名
    //   dirname: __dirname,
    //   typeDefs: [
    //     `

    //             type UserTow {
    //                 id: ID
    //                 name: String
    //                 address: String!
    //                 type:Int!
    //             }

    //             extend type Query {
    //                 getUserTow: UserTow
    //             }
    //         `,
    //   ],
    //   // 这里并没有校验resolvers重复性，所以需要我们自己实现校验
    //   resolvers: {
    //     Mutation: {},
    //     Subscription: {},
    //     Query: {
    //       getUserTow: (root, parameter, source, fieldASTs) => {

    //         return {
    //           id: '2',
    //           name: '用户2模块',
    //           address: 'address',
    //           type: 2,
    //         }
    //       },
    //     },
    //   },
    // },
    // ...baseSchema,
    // ...bizModSchema,
    // ...MarketingModule,
    // ...LogisticsModule,
  ]
});

export { $validateGraphql as validateGraphql };
