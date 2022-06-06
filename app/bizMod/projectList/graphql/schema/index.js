/*
 * @Author: your name
 * @Date: 2021-09-23 18:01:29
 * @LastEditTime: 2021-09-24 11:16:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/index/graphql/schema/index.js
 */
// export { schema as scriptSchema } from "../../bizMod/script"; //scriptSchema
// export { schema as userSchema } from "../../bizMod/user"; //userSchema

import * as resolvers from "./resolvers";
import * as typeDefs from "./typeDefs";

export const indexSchema = { resolvers, typeDefs };
