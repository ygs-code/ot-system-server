/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2022-04-26 10:25:49
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/set/redis/user.js
 */
import { Redis } from "@/redis";

import { expires } from "../config";
// 设置验证码
export const setDocument = (key, value, time) => {
  Redis.set(key, value);
  Redis.pexpire(key, time || expires);
};
// 获取验证码
export const getDocument = (key) => {
  if (key === undefined) {
    return Promise.reject();
  }
  return Redis.get(key);
};
