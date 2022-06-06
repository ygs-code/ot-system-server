/*
 * @Author: your name
 * @Date: 2020-12-28 16:02:26
 * @LastEditTime: 2022-05-20 10:43:04
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/set/bizMod/user/graphql/schema/resolvers/Query/index.js
 */
import { outHttpLog } from "@/utils";




export const getUserInfo = (root, parameter, source, fieldASTs) => {
  const { ctx: { request, response } = {} } = root;
  const { id } = parameter || {};
  // console.log("parameter=", parameter);
  // outHttpLog({
  //   source,
  //   response,
  //   __filename,
  // });
  let data = {};
  const { name, phone } = response.userInfo;
  if (id) {
  } else {
    data = response.userInfo;
  }
  return {
    code: 200,
    message: "请求成功",
    data: {
      name,
      phone,
    },
  };
};
