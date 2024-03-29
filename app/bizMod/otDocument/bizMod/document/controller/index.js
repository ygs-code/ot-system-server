import { type } from "rich-text";
import { captureClassError } from "utils";

import { forbidden, serverError, success, unsupported } from "@/constant";

import Service from "../service";
import Sockets from "../sockets";

@captureClassError()
class Controller {
  static async document({ request, socket, head, params }) {
    // 转换数据
    Sockets.document({ request, socket, head, params });
  }

  // 查询列表
  static async queryList(ctx, next, { parameter }) {
    const { pageNum, pageSize, id, title, createBy } = parameter;
    const { response: { userInfo: { user: { id: userId } = {} } } = {} } = ctx;

    const data = await Service.queryList(ctx, next, {
      pageNum,
      pageSize,
      createBy: createBy == "my" ? userId : undefined,
      // id,
      title
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
          message: "文档id不正确，查询不到对应文档信息",
          data
        };
      },

      3: () => {
        return {
          ...forbidden,
          message: "文档id不正确，查询不到对应文档信息",
          data
        };
      }
    };

    return mapData[status]();
  }
  // 创建
  static async create(ctx, next, { parameter }) {
    const { response: { userInfo: { user: { id: userId } = {} } } = {} } = ctx;

    const { title } = parameter;

    //添加service
    const data = await Service.create(ctx, next, {
      title,
      create_by: userId,
      update_by: userId,
      v: 1,
      type: type.uri,
      content: ""
    });

    const getMessage = (data) => {
      const { status } = data;
      const message = {
        1: () => ({
          code: 200,
          data: data.data,
          message: "操作成功"
        }),
        2: () => ({
          ...unsupported,
          message: "文档创建失败，稍后重试"
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
