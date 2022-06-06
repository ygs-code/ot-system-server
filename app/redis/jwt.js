/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-09-24 12:17:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/redis/jwt.js
 */
import { Redis, redisClient } from "./redis";
import jwt from "./jsonwebtoken";
import { merge, promise } from "@/utils";
import { tokenExpires } from "@/config";

// 创建Token
const createToken = async (userInfo = {}, payload = {}) => {
  const { id = "", username, password } = userInfo;
  //配置参数
  payload = {
    ...payload,
    createTime: new Date().getTime(), //创建时间
    exp: new Date().getTime() + tokenExpires,
  };

  //创建token
  const token = await jwt.sign(payload, `${id}`);

  // 删除旧的token
  await destroyToken(token);
  // 重新设置 redis
  // await Redis.set(
  //   `${id}`,
  //   JSON.stringify({
  //     token,
  //     id,
  //     ...userInfo,
  //   })
  // );
  //自己封装的类
  await Redis.set(
    `${token}`,
    JSON.stringify({
      token,
      id,
      ...userInfo,
    })
  );
  //更新token时间
  updateRequestTime(token);
  return token;
};

//销毁token
const destroyToken = async (token) => {
  await Redis.del(token);
  return "成功删除token";
};
//获取用户信息
const getTokenUserInfo = (token) => {
  return promise((resolve, reject) => {
    redisClient.get(token, (err, data) => {
      if (err || !data) {
        reject(null);
        return false;
      }
      resolve(JSON.parse(data));
    });
  });
};

// 检验Token
const verifyToken = async (token) => {
  const userInfo = (await getTokenUserInfo(token)) || {};
  const { id: signingKey = "" } = userInfo;
  return promise((resolve, reject) => {
    if (userInfo) {
      updateRequestTime(token);
      resolve(userInfo);
    } else {
      reject(null);
    }
  });

  //token校验
  // return promise((resolve, reject) => {
  //   jwt.verify(
  //     token,
  //     `${signingKey}`,
  //     {
  //       updateExp: new Date().getTime() + tokenExpires,
  //     },
  //     (err, decoded) => {
  //       console.log("err===", err);
  //       console.log("decoded===", decoded);
  //       if (err) {
  //         reject(null);
  //       } else {
  //         updateRequestTime(token);
  //         resolve(userInfo);
  //       }
  //     }
  //   );
  // });
};

//更新请求时间
const updateRequestTime = (token) => {
  redisClient.pexpire(`${token}`, tokenExpires);
};

export {
  createToken,
  destroyToken,
  getTokenUserInfo,
  verifyToken,
  updateRequestTime,
};
