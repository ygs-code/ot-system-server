import { captureClassError } from "utils";

import { getVerifyCode } from "@/bizMod/set/redis";
import { forbidden, success, unsupported } from "@/constant";

import Service from "../service";

@captureClassError()
class Controller {
  // 查询列表
  static async queryList(ctx, next, { parameter }) {
    const {
      id,
      roleId: role_id,
      userId: user_id,
      pageNum,
      pageSize
    } = parameter;

    const data = await Service.queryList(ctx, next, {
      id,
      role_id,
      user_id,
      pageNum,
      pageSize
    });

    return {
      ...success,
      data
    };
  }

  // 查询单个用户&角色
  static async query(ctx, next, { id }) {
    //添加service
    const { data, status } = await Service.query(ctx, next, {
      id
    });

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
          message: "用户&角色id不正确，查询不到对应用户&角色信息",
          data
        };
      },

      3: () => {
        return {
          ...forbidden,
          message: "用户&角色id不正确，查询不到对应用户&角色信息",
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
  static async create(ctx, next, parameter) {
    const { response } = ctx;
    const { roleInfo = {} } = parameter;

    const { verificationCode } = roleInfo;

    return getVerifyCode(verificationCode)
      .then(async () => {
        //添加service
        const data = await Service.create(ctx, next, roleInfo);
        // const { status, token, roleInfo } = data;
        const getMessage = (data) => {
          const { status } = data;
          const message = {
            1: () => ({
              ...unsupported,
              message: "该用户&角色名已经存在,请重新输入用户&角色名"
            }),
            2: () => ({
              ...unsupported,
              message: "该手机号码已经存在,请重新输入手机号码"
            }),
            3: () => ({
              ...unsupported,
              message: "该邮箱地址已存在,请重新输入邮箱地址"
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
  // 编辑
  static async edit(ctx, next, { parameter }) {
    const { userId: user_id, roleIds } = parameter;

    const { status } = await Service.edit(ctx, next, {
      user_id,
      roleIds
    });
    const getMessage = (status) => {
      const message = {
        1: () => ({
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
