/*
 * @Author: your name
 * @Date: 2020-12-28 16:02:26
 * @LastEditTime: 2022-06-09 11:49:09
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/bizMod/set/bizMod/user/graphql/schema/resolvers/Query/index.js
 */
import userController from "@/bizMod/set/bizMod/user/controller";

export const getUserList = async (root, parameter) => {
  const { ctx = {}, next } = root;
  console.log("getUserList=========");
  // 获取用户
  return await userController.queryList(ctx, next, parameter);
};

// 获取用户信息
export const getUserInfo = async (root, parameter) => {
  const { ctx = {}, next = {} } = root;

  // 获取用户
  return await userController.query(ctx, next, parameter);
};

// 获取验证码
export const getVerifyCode = async (root, parameter) => {
  const { ctx, next } = root;

  //  //添加service
  const data = await userController.getVerifyCode(ctx, next, parameter);

  return data;
};

// 登录接口
export const login = async (root, parameter) => {
  const { ctx, next } = root;

  //    登录
  const data = await userController.login(ctx, next, parameter);

  return data;
};
