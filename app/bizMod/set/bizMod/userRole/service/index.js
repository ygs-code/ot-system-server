import { captureClassError, getPagParameters } from "utils";

import {
  addUserRole,
  queryUserRoleList,
  removeUserRole
} from "@/bizMod/set/db";

@captureClassError()
class Service {
  // 查询列表
  static async queryList(ctx, next, parameter) {
    const { pageNum, pageSize, id, role_id, user_id } = parameter;

    // 查询出列表
    let [list, total] = await queryUserRoleList(
      {
        and: {
          id,
          role_id,
          user_id
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

  // 编辑
  static async edit(ctx, next, parameter) {
    let { user_id, roleIds } = parameter;
    // 查询出列表
    let [list] = await queryUserRoleList(
      {
        and: {
          user_id
        }
        // andLike: { name }
      },
      {
        pageNum: 1,
        pageSize: 10000
      }
    );

    // 找出新增
    const addIds = roleIds.filter((item) => {
      return !list.some(($item) => {
        return `${$item.roleId}` === `${item}`;
      });
    });

    // 找出删除
    const deleteIds = list
      .filter((item) => {
        return !roleIds.some(($item) => {
          return `${$item}` === `${item.roleId}`;
        });
      })
      .map((item) => item.roleId);

    let p = [];
    for (let item of addIds) {
      p.push(
        addUserRole({
          user_id,
          role_id: item
        })
      );
    }
    for (let item of deleteIds) {
      p.push(
        removeUserRole({
          user_id,
          role_id: item
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
