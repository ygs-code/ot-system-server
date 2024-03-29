/*
 * @Author: your name
 * @Date: 2020-12-28 16:02:26
 * @LastEditTime: 2022-06-09 11:49:09
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/bizMod/set/bizMod/user/graphql/schema/resolvers/Query/index.js
 */
// import Controller from "@/bizMod/set/bizMod/permission/controller";
import Controller from "../../../../controller";

export const getDocumentList = async (root, parameter) => {
  const { ctx = {}, next } = root;

  // 获取 列表
  return await Controller.queryList(ctx, next, parameter);
};

// 获取 文档信息
export const getDocumentInfo = async (root, parameter) => {
  const { ctx = {}, next = {} } = root;
  return await Controller.query(ctx, next, parameter);
};
