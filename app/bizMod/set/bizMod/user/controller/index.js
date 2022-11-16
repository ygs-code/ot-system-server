import userService from "../service";
import { unsupported, unauthorized } from "@/constant";
import { CheckDataType, captureFnError, captureClassError } from "utils";
import { setVerifyCode, getVerifyCode } from "@/bizMod/set/redis";

@captureClassError()
class Controller {
  static a = 123;
  static async query(ctx, next, parameter) {
    // ctx.set("Content-Type", "application/json")
    // const parameter = ctx.request.body; // 获取请求参数
    //添加service
    const data = await userService.query(ctx, next, parameter);
    const getMessage = (data) => {
      const { status } = data;
      const message = {
        1: () => ({
          ...unsupported,
          message: "该用户名已经被注册过,请重新输入用户名",
        }),
        2: () => ({
          ...unsupported,
          message: "该手邮箱地址被注册过,请重新输入邮箱地址",
        }),
        3: () => ({
          ...unsupported,
          message: "该手机号码已经被注册过,请重新输入手机号码",
        }),
        4: () => ({
          code: 200,
          message: "注册成功",
        }),
      };

      return message[status]();
    };
    ctx.response.body = getMessage(data);
  }
  static async register(ctx, next) {
    const { request, response } = ctx;

    const parameter = request.body; // 获取请求参数
    const { variables: { userInfo = {} } = {} } = parameter;
    const { verificationCode } = userInfo;

    return getVerifyCode(verificationCode)
      .then(async () => {
        //添加service
        const data = await userService.register(ctx, next, userInfo);
        // const { status, token, userInfo } = data;
        const getMessage = (data) => {
          const { status } = data;
          const message = {
            1: () => ({
              ...unsupported,
              message: "该用户名已经被注册过,请重新输入用户名",
            }),
            2: () => ({
              ...unsupported,
              message: "该手机号码已经被注册过,请重新输入手机号码",
            }),
            3: () => ({
              ...unsupported,
              message: "该邮箱地址已被注册过,请重新输入邮箱地址",
            }),
            4: () => ({
              code: 200,
              message: "注册成功",
            }),
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
          data: {},
        };
      });
  }
  // @captureFnError()
  static edit(ctx, next) {
    ctx.set("Content-Type", "application/json");

    var page = ctx.params.page; // 获取请求参数
    //添加service
    // const data = userService.list(page);

    // ctx.response.body = "d";
  }
  // @captureFnError()
  static async login(ctx, next, parameter) {
    const { request, response } = ctx;
    // var parameter = request.body; // 获取请求参数
    const { verificationCode } = parameter;

    return await getVerifyCode(verificationCode)
      .then(async () => {
        //添加service
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
                ...userInfo,
              },
            }),
          };
          return message[status]();
        };

        console.log('getMessage(data)==',getMessage(data))
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
          data: {},
        };
      });
    // } catch (e) {
    //   console.log("e===============", e);
    // }
  }
  static async getVerifyCode(ctx, next) {
    // ctx.set("Content-Type", "application/json")
    var parameter = ctx.request.body; // 获取请求参数

    //添加service
    const data = await userService.getVerifyCode(ctx, next, parameter);

    return data;

    // ctx.response.body = {
    //   code: 200,
    //   data,
    //   message: "验证码获取成功",
    // };
  }
}

export default Controller;
