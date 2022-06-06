/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-09-24 11:55:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/db/index.js
 */
export { connection, exec, CheckTable } from "@/db";
export { default as tables } from "./tables";
export * from "./user";
