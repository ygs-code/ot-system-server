/*
 * @Date: 2022-06-06 16:14:24
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-06-08 16:40:05
 * @FilePath: /Blogs/BlogsServer/app/graphql/schema/user/index.js
 * @Description:
 */
import * as resolvers from "./resolvers";
import typeDefs from "./typeDefs";

//会员模块
// export default { resolvers, typeDefs };
export default {
  id: "common", // id不能与其他模块重名
  dirname: __dirname
  // typeDefs: typeDefs,
  // 这里并没有校验resolvers重复性，所以需要我们自己实现校验
  // resolvers,
};
