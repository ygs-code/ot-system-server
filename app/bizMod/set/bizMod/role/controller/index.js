import { captureClassError } from "utils";

import { getVerifyCode } from "@/bizMod/set/redis";
import { forbidden, success, unauthorized, unsupported } from "@/constant";

import Service from "../service";

@captureClassError()
class Controller {
  // 查询列表
  static async queryList(ctx, next, { parameter }) {
    const data = await Service.queryList(ctx, next, parameter);

    return {
      ...success,
      data
    };
  }

  // 查询单个角色
  static async query(ctx, next, parameter) {
    // ctx.set("Content-Type", "application/json")
    // const parameter = ctx.request.body; // 获取请求参数
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
          message: "角色id不正确，查询不到对应角色信息",
          data
        };
      },

      3: () => {
        return {
          ...forbidden,
          message: "角色id不正确，查询不到对应角色信息",
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
  static async create(ctx, next, { parameter = {} } = {}) {
    const { response } = ctx;

    // const { verificationCode } = parameter;

    // return
    // return  getVerifyCode(verificationCode)
    // .then(async () => {
    //添加service
    const data = await Service.create(ctx, next, parameter);
    // const { status, token, roleInfo } = data;
    const getMessage = (data) => {
      const { status } = data;
      const message = {
        1: () => ({
          ...unsupported,
          message: "该角色名已经被注册过,请重新输入角色名"
        }),

        2: () => ({
          code: 200,
          message: "注册成功"
        })
      };
      return message[status]();
    };

    return getMessage(data);
    // })
    // .catch((error) => {
    //   let message = "";
    //   let code = null;

    //   if (error) {
    //     message = "系统错误";
    //     code = 500;
    //     response.console.error(
    //       typeof error === "object" ? JSON.stringify(error) : error,
    //       __filename
    //     );
    //   } else {
    //     message = "验证码错误,或者已过期";
    //     code = 400;
    //   }

    // response.body = {
    //   message,
    //   code,
    //   data: {},
    // };

    // return {
    //   message,
    //   code,
    //   data: {}
    // };
    // });
  }
  // 编辑
  static async edit(ctx, next, parameter) {
    const { parameter: { description, id, name } = {} } = parameter;

    const { data, status } = await Service.edit(ctx, next, {
      description,
      id,
      name
    });
    const getMessage = (status) => {
      const message = {
        1: () => ({
          ...unsupported,
          // console.log(`该角色名${name}已存在，请重新修改角色名`);
          message: `该角色名${name}已存在，请重新修改角色名`
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
}

export default Controller;
