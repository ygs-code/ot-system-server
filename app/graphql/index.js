/*
 * @Date: 2022-06-06 16:14:24
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-06-08 19:19:34
 * @FilePath: /Blogs/BlogsServer/app/graphql/index.js
 * @Description:
 */
import { validateGraphql } from './graphql-modules-validate'
//  会员模块
// import { default as baseSchema } from './schema'
// 数组
import { schema as bizModSchema } from '../bizMod'
import { default as schema } from './schema'

const $validateGraphql = validateGraphql({
  lang: 'zh-CN',
  modules: [ 
    ...bizModSchema,
    ...schema,
    {
      id: 'user2-module', // id不能与其他模块重名
      dirname: __dirname,
      typeDefs: [
        `
   
                type UserTow {
                    id: ID
                    name: String
                    address: String!
                    type:Int!
                }
    
                extend type Query {
                    getUserTow: UserTow
                }
            `,
      ],
      // 这里并没有校验resolvers重复性，所以需要我们自己实现校验
      resolvers: {
        Mutation: {},
        Subscription: {},
        Query: {
          getUserTow: (root, parameter, source, fieldASTs) => {
            console.log('root==', root)
            console.log('parameter==', parameter)
            // console.log('source==',source)
            // console.log('fieldASTs==',fieldASTs)
            return {
              id: '2',
              name: '用户2模块',
              address: 'address',
              type: 2,
            }
          },
        },
      },
    },

    // ...baseSchema,
    // ...bizModSchema,
    // ...MarketingModule,
    // ...LogisticsModule,
  ],
})

export { $validateGraphql as validateGraphql }
