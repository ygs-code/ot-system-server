/*
 * @Author: your name
 * @Date: 2020-12-28 16:02:26
 * @LastEditTime: 2022-06-09 11:49:09
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/bizMod/set/bizMod/user/graphql/schema/resolvers/Query/index.js
 */
import Controller from "@/bizMod/set/bizMod/user/controller";
// 获取 列表
export const getUserList = async (root, parameter) => {
  const { ctx = {}, next } = root;

  return await Controller.queryList(ctx, next, parameter);
};

// 获取 信息
export const getUserInfo = async (root, parameter) => {
  const { ctx = {}, next = {} } = root;

  return await Controller.query(ctx, next, parameter);
};

// 获取验证码
export const getVerifyCode = async (root, parameter) => {
  const { ctx, next } = root;

  const data = await Controller.getVerifyCode(ctx, next, parameter);

  return data;
};

// 登录接口
export const checkLogin = async (root, parameter) => {
  const { ctx, next } = root;

  //    登录检查
  const data = await Controller.checkLogin(ctx, next, parameter);

  return data;
};
