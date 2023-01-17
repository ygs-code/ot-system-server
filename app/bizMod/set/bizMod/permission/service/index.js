import svgCaptcha from "svg-captcha";
import { captureClassError, getPagParameters } from "utils";

import {
  addPermission,
  editPermission,
  editRole,
  queryPermission,
  queryPermissionList,
  // queryPermission,
  queryPermissionRolePermission,
  removeUser
} from "@/bizMod/set/db";
import { getVerifyCode, setVerifyCode } from "@/bizMod/set/redis";
import { tokenExpires } from "@/config";
import { forbidden, success } from "@/constant/httpCode";
import { createToken, destroyToken, verifyToken } from "@/redis";

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
  //创建权限
  static async create(ctx, next, parameter) {
    const { id, name, description, auth_key, parent_id } = parameter;
    /*
     1 查询权限名是否被注册过，
     2 查询手机号码是否被注册过
     3 如果都没有被注册那么就可以注册
    */
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
    let isHasUser = [];
    /*
     1 查询权限
    */
    let permissionInfo = await queryPermission({
      id
    });
    permissionInfo = permissionInfo[0] || {};

    // 更新name
    if (name !== permissionInfo.name) {
      isHasUser = await queryPermission({
        name
      });
      if (isHasUser.length) {
        return {
          status: 1
        };
      }
    }

    // email

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
      .catch((error) => {
        return {
          status: 3,
          data: {}
        };
      });
  }
}

export default Service;
