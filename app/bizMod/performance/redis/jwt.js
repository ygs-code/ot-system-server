/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-08-18 14:10:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/performance/redis/jwt.js
 */
import { Redis, redisClient } from "./redis";
import JWTR from "jwt-redis";
import webJwt from "jsonwebtoken";
import { merge, promise } from "../utils";
// const jwtr = new JWTR(redisClient);
// const { sign, verify, destroy } = jwtr;
const { sign, verify, decode } = webJwt;
// var secret = "secret";
// var jti = "test";
// var payload = { jti };

// 用用户id验证token
const userIdverifyToken = (userId) => {
  return promise((resolve, reject) => {
    redisClient.keys(`userid_${userId}_*`, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
};

//验证token
const verifyToken = (token) => {
  return promise((resolve, reject) => {
    redisClient.keys(`userid_*_${token}`, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
};

const createToken = async (userInfo = {}, payload = {}) => {
  const { id = "" } = userInfo;
  //  产生token
  payload = 
    {
      ...payload,
      ctime: Date.now(), //创建时间
    }

  //创建token
  const token = await sign(payload, `${id}`, { expiresIn: 0 });
  //获取用户token key
  const userIdTokens = await userIdverifyToken(id);
  if (userIdTokens && userIdTokens.length >= 1) {
    // 删除多余的key实现单点登录
    userIdTokens.forEach(async (key) => {
      await Redis.del(key);
    });
  }
  // 重新设置 redis 
  await Redis.set(`userid_${id}_${token}`, JSON.stringify(userInfo));

  return token;
};

//销毁token
const destroyToken = async(tokenOrId) => {
  const userIdTokens = await userIdverifyToken(tokenOrId)||[];
  const tokens = await verifyToken(tokenOrId)||[];
  merge(userIdTokens,tokens).forEach(async (key)=>{
    await Redis.del(key);
  }) 
  return "成功删除token"
};


export { createToken, verifyToken, destroyToken,userIdverifyToken };
