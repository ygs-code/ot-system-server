/*
 * @Author: your name
 * @Date: 2021-09-23 18:03:22
 * @LastEditTime: 2021-09-24 11:20:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/index/service/index.js
 */
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
    return {
      name: "Service",
      ...parameter,
    };
  }
}

export default service;
