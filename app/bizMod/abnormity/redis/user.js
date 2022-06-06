/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-08-23 15:16:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/redis/user.js
 */
import { Redis, redisClient, RedisClass } from "@/redis";
import { verifyCodeExpires } from "../config";
export const setVerifyCode = (key, value, time) => {
  Redis.set(key, value);
  Redis.pexpire(key, time || verifyCodeExpires);
};

export const getVerifyCode = (key) => {
  return Redis.get(key);
};
export {};
