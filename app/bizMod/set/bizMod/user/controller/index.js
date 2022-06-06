import userService from "../service";
import { unsupported, unauthorized } from "@/constant";
import { CheckDataType, captureFnError, captureClassError, aa } from "utils";
import { setVerifyCode, getVerifyCode } from "../../../redis";
// console.log('captureFnError==========',captureFnError)
// console.log('captureClassError==========',captureClassError)
// console.log('CheckDataType==========',CheckDataType)

console.log("aa==========", aa);

@captureClassError()
class Controller {
  static a = 123;
  static async query(ctx, next) {
    // ctx.set("Content-Type", "application/json")
    const parameter = ctx.request.body; // 获取请求参数
    //添加service
    const data = await userService.add(ctx, next, parameter);
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
          code: 200,
          message: "注册成功",
        }),
      };
      return message[status]();
    };
    ctx.response.body = getMessage(data);
  }
  static async register(ctx, next) {
    console.log("register=", register);
    const { request, response } = ctx;

    const parameter = request.body; // 获取请求参数
    const { verificationCode } = parameter;

    getVerifyCode(verificationCode)
      .then(async () => {
        //添加service
        const data = await userService.register(ctx, next, parameter);
        console.log("data=========", data);
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
              code: 200,
              message: "注册成功",
            }),
          };
          return message[status]();
        };
        response.body = getMessage(data);
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

        response.body = {
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
  static async login(ctx, next) {
    const { request, response } = ctx;
    var parameter = request.body; // 获取请求参数
    const { verificationCode } = parameter;
    // console.log(" ctx=", ctx);
    // console.log(" request=", request);
    console.log(" request.body=", request.body);
    console.log(" ctx.params=", ctx.params);
    console.log("aa=", aa);

    await getVerifyCode(verificationCode)
      .then(async () => {
        console.log("getVerifyCode then =======");
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
                userInfo,
              },
            }),
          };
          return message[status]();
        };
        response.body = getMessage(data);
      })
      .catch((error) => {
        console.log("error======", error);
        let { message, code } = error;
        if (code) {
          
        } else if (error) {
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
        response.body = {
          message,
          code,
          data: {},
        };
      });
    // } catch (e) {
    //   console.log("e===============", e);
    // }
  }
  static async verifyCode(ctx, next) {
    // ctx.set("Content-Type", "application/json")
    var parameter = ctx.request.body; // 获取请求参数

    //添加service
    const data = await userService.verifyCode(ctx, next, parameter);

    ctx.response.body = {
      code: 200,
      data,
      message: "验证码获取成功",
    };
  }
}

export default Controller;
