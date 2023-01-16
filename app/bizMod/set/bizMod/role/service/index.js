import svgCaptcha from "svg-captcha";
import { captureClassError, getPagParameters } from "utils";

import {
  addRole,
  editRole,
  queryRole,
  queryRoleList,
  queryUser,
  queryUserRolePermission,
  removeUser
} from "@/bizMod/set/db";
import { getVerifyCode, setVerifyCode } from "@/bizMod/set/redis";
import { tokenExpires } from "@/config";
import { forbidden, success } from "@/constant/httpCode";
import {
  createToken,
  destroyToken,
  getTokenroleInfo,
  verifyToken
} from "@/redis";

@captureClassError()
class Service {
  // 查询列表
  static async queryList(ctx, next, parameter) {
    const { pageNum, pageSize, id, name } = parameter;

    // 查询出列表
    let [list, total] = await queryRoleList(
      {
        and: {
          id
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
  //创建角色
  static async create(ctx, next, parameter) {
    const { description, id, name } = parameter;
    /*
     1 查询角色名是否被注册过，
     2 查询手机号码是否被注册过
     3 如果都没有被注册那么就可以注册
    */
    let roleInfo = await queryRole({
      name
    });

    roleInfo = roleInfo.length >= 1 ? roleInfo[0] : null;
    if (roleInfo && roleInfo.id) {
      return {
        status: 1
      };
    }

    const data = await addRole({
      description,
      name
    });

    if (data) {
      return {
        status: 2
      };
    }
  }
  // 编辑角色
  static async edit(ctx, next, parameter) {
    const { description, id, name } = parameter;
    console.log("parameter===", parameter);
    let isHasUser = [];
    /*
     1 查询角色
    */
    let roleInfo = await queryRole({
      id
    });
    roleInfo = roleInfo[0] || {};

    // 更新name
    if (name !== roleInfo.name) {
      isHasUser = await queryRole({
        name
      });
      if (isHasUser.length) {
        return {
          status: 1
        };
      }
    }

    await editRole({ description, id, name });

    return {
      status: 2
    };
  }
  // 数据库中查询角色
  static async query(ctx, next, parameter) {
    const { id } = parameter || {};

    return await queryRole({
      id
    })
      .then((roleInfo) => {
        roleInfo = roleInfo.length >= 1 ? roleInfo[0] : null;
        return roleInfo
          ? {
              status: 1,
              data: roleInfo
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
