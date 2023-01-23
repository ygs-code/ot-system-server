/*
 * @Date: 2022-06-06 16:14:24
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-06-08 18:21:12
 * @FilePath: /Blogs/BlogsServer/app/bizMod/set/bizMod/user/graphql/schema/index.js
 * @Description:
 */
import * as resolvers from "./resolvers";
import typeDefs from "./typeDefs";

export default {
  id: "user-role-module", // id不能与其他模块重名
  dirname: __dirname,
  typeDefs: [typeDefs],
  // 这里并没有校验resolvers重复性，所以需要我们自己实现校验
  resolvers
};
