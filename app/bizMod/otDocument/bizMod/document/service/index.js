import { captureClassError, getPagParameters } from "utils";

import {
  addPermission,
  editPermission,
  queryPermission,
  queryPermissionList,
  removePermission
} from "@/bizMod/set/db";

@captureClassError()
class Service {
  // 查询列表
  static async queryList(ctx, next, parameter) {
    const { pageNum, pageSize, id, name, parent_id, auth_key } = parameter;

    // 查询出列表
    let [list, total] = await queryPermissionList(
      {
        and: {
          id,
          auth_key,
          parent_id
        },
        andLike: { name }
      },
      {
        pageNum,
        pageSize
      }
    );

    return {
      list,
      ...getPagParameters({
        total: total[0].total,
        pageNum,
        pageSize
      })
    };
  }
  //创建
  static async create(ctx, next, parameter) {
    const { name, description, auth_key, parent_id } = parameter;

    let permissionInfo = await queryPermission({
      name
    });

    permissionInfo = permissionInfo.length >= 1 ? permissionInfo[0] : null;
    if (permissionInfo && permissionInfo.id) {
      return {
        status: 1
      };
    }

    permissionInfo = await queryPermission({
      auth_key
    });

    permissionInfo = permissionInfo.length >= 1 ? permissionInfo[0] : null;

    if (permissionInfo && permissionInfo.id) {
      return {
        status: 2
      };
    }

    const data = await addPermission({
      name,
      description,
      auth_key,
      parent_id
    });

    if (data) {
      return {
        status: 3
      };
    }
  }
  // 编辑权限
  static async edit(ctx, next, parameter) {
    const { description, id, name, parent_id, auth_key } = parameter;
    let isHas = [];
    /*
     1 查询权限
    */
    let permissionInfo = await queryPermission({
      id
    });
    permissionInfo = permissionInfo[0] || {};

    // 更新name
    if (name !== permissionInfo.name) {
      isHas = await queryPermission({
        name
      });
      if (isHas.length) {
        return {
          status: 1
        };
      }
    }

    await editPermission({
      description,
      id,
      name,
      parent_id,
      auth_key
    });

    return {
      status: 2
    };
  }
  // 删除权限
  static async remove(ctx, next, { id }) {
    return await removePermission(id)
      .catch(() => {
        return {
          status: 1
        };
      })
      .then(() => {
        return {
          status: 2
        };
      });
  }
  // 数据库中查询权限
  static async query(ctx, next, parameter) {
    const { id } = parameter || {};

    return await queryPermission({
      id
    })
      .then((permissionInfo) => {
        permissionInfo = permissionInfo.length >= 1 ? permissionInfo[0] : null;
        return permissionInfo
          ? {
              status: 1,
              data: permissionInfo
            }
          : {
              status: 2,
              data: {}
            };
      })
      .catch(() => {
        return {
          status: 3,
          data: {}
        };
      });
  }
}

export default Service;
