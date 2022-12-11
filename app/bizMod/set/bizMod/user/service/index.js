import svgCaptcha from "svg-captcha";
import { captureClassError, getPagParameters } from "utils";

import {
  addUser,
  queryUser,
  queryUserList,
  queryUserRolePermission,
  removeUser
} from "@/bizMod/set/db";
import { getVerifyCode, setVerifyCode } from "@/bizMod/set/redis";
import { tokenExpires } from "@/config";
import { forbidden, success } from "@/constant/httpCode";
import {
  createToken,
  destroyToken,
  getTokenUserInfo,
  verifyToken
} from "@/redis";

@captureClassError()
class Service {
  // 查询列表
  static async queryList(ctx, next, parameter) {
    const { pageNum, pageSize, email, id, name, phone } = parameter;

    // 查询出列表
    let [list, total] = await queryUserList(
      {
        and: {
          email,
          id,
          phone
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

  //创建用户
  static async create(ctx, next, parameter) {
    const { name, phone, password, email, type } = parameter;
    /*
     1 查询用户名是否被注册过，
     2 查询手机号码是否被注册过
     3 如果都没有被注册那么就可以注册
    */
    let userInfo = await queryUser({
      name
    });

    userInfo = userInfo.length >= 1 ? userInfo[0] : null;
    if (userInfo && userInfo.id) {
      return {
        status: 1
      };
    }

    userInfo = await queryUser({
      phone
    });

    userInfo = userInfo.length >= 1 ? userInfo[0] : null;

    if (userInfo && userInfo.id) {
      return {
        status: 2
      };
    }

    userInfo = await queryUser({
      email
    });

    userInfo = userInfo.length >= 1 ? userInfo[0] : null;

    if (userInfo && userInfo.id) {
      return {
        status: 3
      };
    }

    const data = await addUser({
      email,
      name,
      phone,
      password,
      type
    });

    if (data) {
      return {
        status: 4
      };
    }
  }
  // 编辑用户
  static async edit(ctx, next, parameter) {}
  // 数据库中查询用户
  static async query(ctx, next, parameter) {
    let {
      request,
      query: { query: clientSchema = "", operationName: queryOperationName },
      cookies,
      response,
      method
    } = ctx;
    const {
      body: { query, mutation, operationName: bodyOperationName },
      header
    } = request;

    const { id } = parameter || {};
    if (id) {
      return await queryUser({
        id
      })
        .then((userInfo) => {
          userInfo = userInfo.length >= 1 ? userInfo[0] : null;
          return userInfo
            ? {
                status: 1,
                data: {
                  user: userInfo
                }
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
    const token = cookies.get("token") || header.token;
    let data = await verifyToken(token)
      .then(async (value) => {
        return value;
        // await next();
      })
      .catch((error) => {
        return {
          status: 4,
          data: {}
        };
      });
    return {
      // ...success,
      status: 1,
      data
    };
  }
  // 登录
  static async login(ctx, next, parameter = {}) {
    const { name, phone, password } = parameter;
    const { request, response, cookies } = ctx;
    let nameField = "name";

    /*
      1.先查询用户名是否正确，
      2.查询用户和密码是否正确
      3.创建token,存储到redis中
      4.把用户信息挂载response中
    */
    // 用用户名查询
    let userInfo = await queryUser({
      name
    });

    // 手机查询
    if (!userInfo.length) {
      nameField = "phone";
      userInfo = await queryUser({
        phone: name
      });
    }

    // 邮箱查询
    if (!userInfo.length) {
      nameField = "email";
      userInfo = await queryUser({
        email: name
      });
    }

    if (!userInfo.length) {
      return {
        status: 1
      };
    }

    // 用户查询
    userInfo = await queryUser({
      [nameField]: name,
      password
    });

    if (!userInfo.length) {
      return {
        status: 2
      };
    }

    userInfo = userInfo[0];

    /*
     创建 createToken
    */
    delete userInfo.password;

    // // 查询 权限key ,查询 角色
    let userRolePermissionData = await queryUserRolePermission(userInfo.id);
    if (userRolePermissionData.length) {
      userRolePermissionData = userRolePermissionData[0];
      userRolePermissionData = userRolePermissionData.reduce(
        (acc, item, index) => {
          const { permission = [], authKeys = [], role = [] } = acc;
          const {
            permissionId,
            permissionName,
            permissionDescription,
            permissionAuthKey,
            permissionParentAuthKey,
            roleId,
            roleName,
            roleDescription
          } = item;
          permission.push({
            id: permissionId,
            name: permissionName,
            description: permissionDescription,
            authKey: permissionAuthKey,
            parentAuthKey: permissionParentAuthKey
          });
          authKeys.push(permissionAuthKey);
          let flag = role.some((item) => {
            return item.id == roleId;
          });
          if (!flag) {
            role.push({
              id: roleId,
              name: roleName,
              description: roleDescription
            });
          }
          return {
            ...acc,
            permission,
            authKeys,
            role
          };
        },
        {}
      );
    } else {
      userRolePermissionData = {};
    }

    let data = {
      user: userInfo,
      ...userRolePermissionData
    };
    const token = await createToken(data);

    cookies.set("token", token, {
      httpOnly: true, //  服务器可访问 cookie, 默认是 true 前端不能修改 cookie
      overwrite: false, // 一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie
      // secure :true, // 安全 cookie 设置后只能通过https来传递cookie
      // 设置过期时间
      expires: new Date(new Date().getTime() + tokenExpires),
      path: "/" // cookie 路径, 默认是'/'
      // domain: 'http://localhost/',  // 设置cookie访问域名
    });

    //登录成功
    return {
      status: 3,
      token,
      userInfo: data
    };
  }
  // 验证码
  static async getVerifyCode(ctx, next, parameter = {}) {
    const { name, phone, password } = parameter;
    const { request, response, cookies } = ctx;
    var codeConfig = {
      size: 5, // 验证码长度
      ignoreChars: "0o1i", // 验证码字符中排除 0o1i
      noise: 3, // 干扰线条的数量
      height: 35,
      width: 110,
      fontSize: 40,
      color: false, //字符将有不同的颜色而不是灰色，如果设置了背景选项为True
      background: `#99CCCC` //SVG图像的背景颜色
    };
    var captcha = svgCaptcha.create(codeConfig);
    const { data: imageSvg, text } = captcha;
    setVerifyCode(text, text);
    console.log("verifyCode==================", text);

    //登录成功
    return {
      svg: imageSvg
    };
  }
}

export default Service;
