import { captureClassError } from "utils";

import { forbidden, serverError, success, unsupported } from "@/constant";

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

  // 查询单个信息
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
    const data = await Service.create(ctx, next, parameter);

    const getMessage = (data) => {
      const { status } = data;
      const message = {
        1: () => ({
          ...unsupported,
          message: "该角色名已经存在,请重新输入角色名"
        }),

        2: () => ({
          code: 200,
          message: "操作成功"
        })
      };
      return message[status]();
    };

    return getMessage(data);
  }
  // 编辑
  static async edit(ctx, next, parameter) {
    const { parameter: { description, id, name } = {} } = parameter;

    const { status } = await Service.edit(ctx, next, {
      description,
      id,
      name
    });
    const getMessage = (status) => {
      const message = {
        1: () => ({
          ...unsupported,

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
}

export default Controller;
