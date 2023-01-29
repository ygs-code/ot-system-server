import { captureClassError, getPagParameters } from "utils";

import {
  addRolePermission,
  queryRolePermissionList,
  removeRolePermission
} from "@/bizMod/set/db";

@captureClassError()
class Service {
  // 查询列表
  static async queryList(ctx, next, parameter) {
    const { pageNum, pageSize, id, role_id, permission_id } = parameter;

    // 查询出列表
    let [list, total] = await queryRolePermissionList(
      {
        and: {
          id,
          role_id,
          permission_id
        }
        // andLike: { name }
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

  // 编辑角色
  static async edit(ctx, next, parameter) {
    let { role_id, permissionIds } = parameter;
    // 查询出列表
    let [list] = await queryRolePermissionList(
      {
        and: {
          role_id
        }
        // andLike: { name }
      },
      {
        pageNum: 1,
        pageSize: 10000
      }
    );

    // 找出新增
    const addIds = permissionIds.filter((item) => {
      return !list.some(($item) => {
        return `${$item.permissionId}` === `${item}`;
      });
    });

    // 找出删除
    const deleteIds = list
      .filter((item) => {
        return !permissionIds.some(($item) => {
          return `${$item}` === `${item.permissionId}`;
        });
      })
      .map((item) => item.permissionId);
    let p = [];
    for (let item of addIds) {
      p.push(
        addRolePermission({
          role_id,
          permission_id: item
        })
      );
    }
    for (let item of deleteIds) {
      p.push(
        removeRolePermission({
          role_id,
          permission_id: item
        })
      );
    }

    await Promise.all(p);

    return {
      status: 1
    };
  }
}

export default Service;
