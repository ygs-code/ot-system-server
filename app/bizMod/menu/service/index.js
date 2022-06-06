/*
 * @Author: your name
 * @Date: 2021-09-24 14:30:11
 * @LastEditTime: 2021-09-24 15:51:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/menu/service/index.js
 */
import { queryMenu } from "../db";
class service {
  static async add(ctx, next, parameter) {
    return {
      name: "Service",
      ...parameter,
    };
  }
  static async reomve(ctx, next, parameter) {
    return {
      name: "Service",
      ...parameter,
    };
  }
  static async edit(ctx, next, parameter) {
    return {
      name: "Service",
      ...parameter,
    };
  }
  static async query(ctx, next, parameter) {
    return await queryMenu();
  }
}

export default service;
