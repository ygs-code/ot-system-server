/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-09-24 11:08:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/bizMod/script/controller/index.js
 */
import Service from "../service";

class Controller {
  static async query(ctx, next) {
    console.log("Controller_query12341==");
    const { query = {}, response, request } = ctx;
    const {
      body = {
        // mutation = '', variables = {}
      },
    } = request;
    const parameter = query; // 获取请求参数
    console.log("Service.query==", Service.query);
    //添加Service
    const data = await Service.query(ctx, next, parameter);
    ctx.response.body = data;
  }
  static async add(ctx, next) {
    // ctx.set("Content-Type", "application/json")
    const parameter = ctx.request.body; // 获取请求参数

    // //添加Service
    // const data = await userService.add(ctx, next, parameter);
    // const getMessage = (data) => {
    //   const { status } = data;
    //   const message = {
    //     1: () =>
    //       ( {
      // ...unsupported,
    //         message: "该用户名已经被注册过,请重新输入用户名",
    //       }),
    //     2: () =>
    //       ( {
      // ...unsupported,
    //         message: "该手机号码已经被注册过,请重新输入手机号码",
    //       }),
    //     3: () => ({
    //       code: 200,
    //       message: "注册成功",
    //     }),
    //   };
    // return message[status]();
    // };
    ctx.response.body = parameter;
  }
  static edit(ctx, next) {
    ctx.set("Content-Type", "application/json");

    var page = ctx.params.page; // 获取请求参数
    //添加Service
    // const data = userService.list(page);

    // ctx.response.body = "d";
  }

  static async remove(ctx, next) {
    // ctx.set("Content-Type", "application/json")
    var parameter = ctx.request.body; // 获取请求参数
    //添加Service
    const data = await userService.login(ctx, next, parameter);
    const getMessage = (data) => {
      const { status, token, userInfo } = data;
      const message = {
        1: () => ({
          ...unauthorized,
          message: "用户名错误，请重新输入用户名",
        }),
        2: () => ({
          ...unauthorized,
          message: "密码错误请重新输入密码",
        }),
        3: () => ({
          code: 200,
          message: "登录成功",
          data: {
            token,
            userInfo,
          },
        }),
      };
      return message[status]();
    };
    ctx.response.body = getMessage(data);
  }
}

export default Controller;
