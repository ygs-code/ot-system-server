import { addUser, removeUser, queryUser } from "../../../db";
import { unsupported, unauthorized } from "@/constant";
import { merge } from "@/utils";
import svgCaptcha from "svg-captcha";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import {
  createToken,
  verifyToken,
  destroyToken,
  getTokenUserInfo,
} from "@/redis";

import { setVerifyCode, getVerifyCode } from "../../../redis";

import { tokenExpires } from "@/config";

class Service {
  static list(page) {
    console.log("page=", page);
    const dataList = {
      list: [
        {
          time: "2019-7-10",
          id: 1,
          title: "this is news 1",
          url: "/news/1",
        },
        {
          time: "2019-8-10",
          id: 2,
          title: "this is news 2",
          url: "/news/2",
        },
      ],
    };

    return dataList.list[page] || {};
  }

  //注册用户
  static async register(ctx, next, parameter) {
    const { username: name, phone, password } = parameter;
    /*
     1 查询用户名是否被注册过，
     2 查询手机号码是否被注册过
     3 如果都没有被注册那么就可以注册
    */
    let userInfo = await this.queryUser({
      name,
    });

    userInfo = userInfo.length >= 1 ? userInfo[0] : null;
    if (userInfo && userInfo.id) {
      return {
        status: 1,
      };
    }

    userInfo = await this.queryUser({
      phone,
    });
    userInfo = userInfo.length >= 1 ? userInfo[0] : null;
    if (userInfo && userInfo.id) {
      return {
        status: 2,
      };
    }
    const data = await addUser({
      name,
      phone,
      password,
    });
    if (data) {
      return {
        status: 3,
      };
    }
  }
  // 编辑用户
  static async edit(ctx, next, parameter) {}
  // 数据库中查询用户
  static async queryUser(...ags) {
    const userData = await queryUser(...ags);
    return userData;
  }
  // 登录
  static async login(ctx, next, parameter = {}) {
    const { username: name, phone, password } = parameter;
    const { request, response, cookies } = ctx;

    /*
      1.先查询用户名是否正确，
      2.查询用户和密码是否正确
      3.创建token,存储到redis中
      4.把用户信息挂载response中
    */
    let userInfo = await this.queryUser({
      name,
    });

    userInfo = userInfo.length >= 1 ? userInfo[0] : null;
    if (!userInfo) {
      return {
        status: 1,
      };
    }

    userInfo = await this.queryUser({
      password,
    });

    userInfo = userInfo.length >= 1 ? userInfo[0] : null;
    if (!userInfo) {
      return {
        status: 2,
      };
    }

    userInfo = await queryUser({
      name,
      password,
    });

    userInfo = userInfo.length >= 1 ? userInfo[0] : null;

    /*
     创建 createToken  
    */
    delete userInfo.password;
    const token = await createToken(userInfo);

    ctx.response.userInfo = userInfo;

    cookies.set("token", token, {
      httpOnly: false,
      overwrite: false,
      // 设置过期时间
      expires: new Date(new Date().getTime() + tokenExpires),
      // domain: 'http://localhost/',
    });
    if (userInfo) {
      //登录成功
      return {
        status: 3,
        token,
        userInfo,
      };
    }
  }

  static async verifyCode(ctx, next, parameter = {}) {
    const { username: name, phone, password } = parameter;
    const { request, response, cookies } = ctx;

    // console.log('parameter=',parameter)

    var codeConfig = {
      size: 5, // 验证码长度
      ignoreChars: "0o1i", // 验证码字符中排除 0o1i
      noise: 3, // 干扰线条的数量
      height: 35,
      width: 110,
      fontSize: 40,
      color: false, //字符将有不同的颜色而不是灰色，如果设置了背景选项为True
      background: `#99CCCC`, //SVG图像的背景颜色
    };
    var captcha = svgCaptcha.create(codeConfig);
    const { data: imageSvg, text } = captcha;
    setVerifyCode(text, text);
    console.log("verifyCode=", text);

    //登录成功
    return {
      svg: imageSvg,
    };
  }
}

export default Service;
