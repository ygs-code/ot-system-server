/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2022-04-26 10:25:49
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/set/redis/user.js
 */

import RedisClass, { Redis, redisClient } from "./redis";
import { verifyCodeExpires } from "@/config";
export const setVerifyCode = (key, value, time) => {
  redisClient.set(key, value);
  redisClient.pexpire(key, time || verifyCodeExpires);
};

export const getVerifyCode = (key) => {
  if (key === undefined) {
    return Promise.reject();
  }
  return redisClient.get(key);
};
