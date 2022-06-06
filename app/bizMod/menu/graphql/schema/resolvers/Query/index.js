/*
 * @Author: your name
 * @Date: 2020-12-28 16:02:26
 * @LastEditTime: 2021-09-24 16:04:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/bizMod/script/graphql/schema/resolvers/Query/index.js
 */
import { outHttpLog } from "@/utils";
import controller from "../../../../controller"; // koa 路由中间件
export const queryMenu = async (root, parameter, source, fieldASTs) => {
  const { ctx = {}, next = {} } = root;
  const { request, response } = ctx;
  outHttpLog({
    source,
    response,
    __filename,
  });

  let data = await controller.query(ctx, next);

  // console.log("parameter=", parameter);

  return {
    code: 200,
    message: "请求成功",
    data,
  };
};
