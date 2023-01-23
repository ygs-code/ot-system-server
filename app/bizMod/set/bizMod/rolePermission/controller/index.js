import { captureClassError } from "utils";

import { success } from "@/constant";

import Service from "../service";

@captureClassError()
class Controller {
  // 查询列表
  static async queryList(ctx, next, { parameter }) {
    const {
      id,
      roleId: role_id,
      permissionId: permission_id,
      pageNum,
      pageSize
    } = parameter;

    const data = await Service.queryList(ctx, next, {
      id,
      role_id,
      permission_id,
      pageNum,
      pageSize
    });

    return {
      ...success,
      data
    };
  }

  // 编辑
  static async edit(ctx, next, { parameter }) {
    const { roleId: role_id, permissionIds } = parameter;

    const { status } = await Service.edit(ctx, next, {
      role_id,
      permissionIds
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
