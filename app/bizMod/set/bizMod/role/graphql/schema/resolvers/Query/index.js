/*
 * @Author: your name
 * @Date: 2020-12-28 16:02:26
 * @LastEditTime: 2022-06-09 11:49:09
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/bizMod/set/bizMod/user/graphql/schema/resolvers/Query/index.js
 */
import Controller from "@/bizMod/set/bizMod/role/controller";

// 获取列表
export const getRoleList = async (root, parameter) => {
  const { ctx = {}, next } = root;

  return await Controller.queryList(ctx, next, parameter);
};

// 获取 信息
export const getRoleInfo = async (root, parameter) => {
  const { ctx = {}, next = {} } = root;

  return await Controller.query(ctx, next, parameter);
};
