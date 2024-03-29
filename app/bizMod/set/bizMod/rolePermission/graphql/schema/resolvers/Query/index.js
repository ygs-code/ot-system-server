/*
 * @Author: your name
 * @Date: 2020-12-28 16:02:26
 * @LastEditTime: 2022-06-09 11:49:09
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/bizMod/set/bizMod/user/graphql/schema/resolvers/Query/index.js
 */
import Controller from "@/bizMod/set/bizMod/rolePermission/controller";

export const getRolePermissionList = async (root, parameter) => {
  const { ctx = {}, next } = root;

  // 获取角色
  return await Controller.queryList(ctx, next, parameter);
};
