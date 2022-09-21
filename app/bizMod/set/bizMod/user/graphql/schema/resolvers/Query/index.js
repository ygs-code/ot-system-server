/*
 * @Author: your name
 * @Date: 2020-12-28 16:02:26
 * @LastEditTime: 2022-06-09 11:49:09
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/bizMod/set/bizMod/user/graphql/schema/resolvers/Query/index.js
 */
import { outHttpLog } from "@/utils";

import userService from "@/bizMod/set/bizMod/user/service";

export const getUserInfo = (root, parameter, source, fieldASTs) => {
  const { ctx: { request, response } = {} } = root;
  const { id } = parameter || {};
  console.log("parameter=", parameter);
  // outHttpLog({
  //   source,
  //   response,
  //   __filename,
  // });
  // let data = {};
  // const { name, phone } = response.userInfo;
  // if (id) {
  // } else {
  //   data = response.userInfo;
  // }
  return {
    code: 200,
    message: "请求成功",
    data: {
      name: "name",
      phone: "1232133213123",
    },
  };
};

export const getVerifyCode = async (root, parameter, source, fieldASTs) => {
  const { ctx, next } = root;
  const { request, response } = ctx;
  const { id } = parameter || {};

  //  //添加service
  const data = await userService.getVerifyCode(ctx, next, parameter);

  return {
    code: 200,
    data,
    message: "验证码获取成功",
  };
};
