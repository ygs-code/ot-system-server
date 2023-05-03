import { captureClassError } from "utils";

import { getVerifyCode } from "@/bizMod/set/redis";
import {
  forbidden,
  serverError,
  success,
  unauthorized,
  unsupported
} from "@/constant";
import { verifyToken } from "@/redis/index";

import Service from "../service";

@captureClassError()
class Controller {
  // 检查登录接口
  static async checkLogin(ctx, next, parameter) {
    let { request, cookies } = ctx;
    const { header } = request;

    const token = cookies.get("token") || header.token;

    //
    const data = await Service.checkLogin(ctx, next, {
      token
    });

    return {
      ...success,
      data
    };
  }
  // 登录
  static async login(ctx, next, parameter) {
    const { response } = ctx;

    const { verificationCode } = parameter;

    return await getVerifyCode(verificationCode)
      .then(async () => {
        //添加service
        const data = await Service.login(ctx, next, parameter);

        const getMessage = (data) => {
          const { status, token, userInfo } = data;
          const message = {
            1: () => ({
              ...unauthorized,
              message: "用户名错误，请重新输入用户名"
            }),
            2: () => ({
              ...unauthorized,
              message: "密码错误请重新输入密码"
            }),
            3: () => ({
              code: 200,
              message: "登录成功",
              data: {
                token,
                ...userInfo
              }
            })
          };
          return message[status]();
        };

        return getMessage(data);
      })
      .catch((error) => {
        let message;
        let code;
        if (error) {
          message = `系统错误:${
            typeof error === "object" ? JSON.stringify(error) : error
          }`;
        } else {
          message = "验证码错误,或者已过期";
          code = 400;
        }

        response.console.error(message, __filename);
        return {
          message,
          code,
          data: {}
        };
      });
    // } catch (e) {

    // }
  }

  static async logOut(ctx, next, parameter) {
    const { response } = ctx;

    const { verificationCode } = parameter;

    return await this.checkLogin(ctx, next, parameter).then(async (res) => {
      const { data: { flag } = {} } = res;

      let data = {};
      console.log("res====", res);
      if (flag) {
        let { request, cookies } = ctx;
        const { header } = request;

        const token = cookies.get("token") || header.token;

        data = await Service.logOut(ctx, next, {
          token
        });
      }
      //添加service
      // const data = await Service.logOut(ctx, next, parameter);

      // const getMessage = (data) => {
      //   const { status, token, userInfo } = data;
      //   const message = {
      //     1: () => ({
      //       ...unauthorized,
      //       message: "用户名错误，请重新输入用户名"
      //     }),
      //     2: () => ({
      //       ...unauthorized,
      //       message: "密码错误请重新输入密码"
      //     }),
      //     3: () => ({
      //       code: 200,
      //       message: "登录成功",
      //       data: {
      //         token,
      //         ...userInfo
      //       }
      //     })
      //   };
      //   return message[status]();
      // };

      // return getMessage(data);

      console.log('data===',data)

      return {
        code: 200,
        message: "操作成功",
        data
      };
    });
  }
  static async queryList(ctx, next, { parameter }) {
    const data = await Service.queryList(ctx, next, parameter);

    return {
      ...success,
      data
    };
  }

  // 查询单个用户
  static async query(ctx, next, parameter) {
    //添加service
    const { data, status } = await Service.query(ctx, next, parameter);

    const mapData = {
      1: () => {
        return {
          ...success,
          data
        };
      },
      2: () => {
        return {
          ...forbidden,
          message: "用户id不正确，查询不到对应用户信息",
          data
        };
      },

      3: () => {
        return {
          ...forbidden,
          message: "用户id不正确，查询不到对应用户信息",
          data
        };
      },
      4: () => {
        return {
          ...forbidden,
          message: "登录回话已过期，请重新登录",
          data
        };
      }
    };

    return mapData[status]();
  }
  // 创建
  static async create(ctx, next, { parameter }) {
    const { response } = ctx;

    const { verificationCode } = parameter;

    return getVerifyCode(verificationCode)
      .then(async () => {
        //添加service
        const data = await Service.create(ctx, next, parameter);
        // const { status, token, userInfo } = data;
        const getMessage = (data) => {
          const { status } = data;
          const message = {
            1: () => ({
              ...unsupported,
              message: "该用户名已经被注册过,请重新输入用户名"
            }),
            2: () => ({
              ...unsupported,
              message: "该手机号码已经被注册过,请重新输入手机号码"
            }),
            3: () => ({
              ...unsupported,
              message: "该邮箱地址已被注册过,请重新输入邮箱地址"
            }),
            4: () => ({
              code: 200,
              message: "注册成功"
            })
          };
          return message[status]();
        };

        return getMessage(data);
      })
      .catch((error) => {
        let message = "";
        let code = null;

        if (error) {
          message = "系统错误";
          code = 500;
          response.console.error(
            typeof error === "object" ? JSON.stringify(error) : error,
            __filename
          );
        } else {
          message = "验证码错误,或者已过期";
          code = 400;
        }

        // response.body = {
        //   message,
        //   code,
        //   data: {},
        // };

        return {
          message,
          code,
          data: {}
        };
      });
  }

  // 删除
  static async remove(ctx, next, { id }) {
    const { status } = await Service.remove(ctx, next, {
      id
    });

    const getMessage = (status) => {
      const message = {
        1: () => ({
          ...serverError
        }),
        2: () => ({
          code: 200,
          message: "操作成功"
        })
      };

      return message[status]();
    };

    return getMessage(status);
  }
  // 编辑
  static async edit(ctx, next, parameter) {
    const {
      parameter: { email, id, name, phone, type }
    } = parameter;

    const { status } = await Service.edit(ctx, next, {
      email,
      id,
      name,
      phone,
      type
    });
    const getMessage = (status) => {
      const message = {
        1: () => ({
          ...unsupported,

          message: `该用户名${name}已存在，请重新修改用户名`
        }),
        2: () => ({
          ...unsupported,
          message: `该用邮箱地址${email}已存在，请重新修改邮箱地址`
        }),
        3: () => ({
          code: 400,
          message: `该用手机号码${phone}已存在，请重新修改手机号码`
        }),
        4: () => ({
          code: 200,
          message: "操作成功"
        })
      };
      return message[status]();
    };

    return getMessage(status);
  }

  // 验证码
  static async getVerifyCode(ctx, next) {
    var parameter = ctx.request.body; // 获取请求参数

    //添加service
    const data = await Service.getVerifyCode(ctx, next, parameter);

    return {
      ...success,
      data,
      message: "验证码获取成功"
    };
  }
}

export default Controller;
