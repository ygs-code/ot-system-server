import { captureClassError } from "utils";

import { forbidden, success, unsupported } from "@/constant";

import Service from "../service";

@captureClassError()
class Controller {
  // 查询列表
  static async queryList(ctx, next, { parameter }) {
    const {
      pageNum,
      pageSize,
      id,
      name,
      parentId: parent_id,
      authKey: auth_key
    } = parameter;

    const data = await Service.queryList(ctx, next, {
      pageNum,
      pageSize,
      id,
      name,
      parent_id,
      auth_key
    });

    return {
      ...success,
      data
    };
  }

  // 查询单个权限
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
          message: "权限id不正确，查询不到对应权限信息",
          data
        };
      },

      3: () => {
        return {
          ...forbidden,
          message: "权限id不正确，查询不到对应权限信息",
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
    const {
      id,
      name,
      description,
      authKey: auth_key,
      parentId: parent_id
    } = parameter;

    //添加service
    const data = await Service.create(ctx, next, {
      id,
      name,
      description,
      auth_key,
      parent_id
    });

    const getMessage = (data) => {
      const { status } = data;
      const message = {
        1: () => ({
          ...unsupported,
          message: "该权限名已经存在,请重新输入权限名"
        }),
        2: () => ({
          ...unsupported,
          message: "该权限key已经存在,请重新输入权限key"
        }),
        3: () => ({
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
    const {
      parameter: {
        description,
        id,
        name,
        parentId: parent_id,
        authKey: auth_key
      }
    } = parameter;

    const { status } = await Service.edit(ctx, next, {
      description,
      id,
      name,
      parent_id,
      auth_key
    });
    const getMessage = (status) => {
      const message = {
        1: () => ({
          ...unsupported,

          message: `该权限名${name}已存在，请重新修改权限名`
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
