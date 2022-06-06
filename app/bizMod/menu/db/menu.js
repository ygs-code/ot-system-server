/*
 * @Author: your name
 * @Date: 2021-09-24 11:21:57
 * @LastEditTime: 2021-09-24 15:49:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/index/db/projectList.js
 */
import { connection, exec, CheckTable } from "@/db";
export const addMenu = () => {};
export const removeMenu = () => {};
export const queryMenu = async () => {
  const sql = "select * from menu";
  await exec(sql);
};
export const editMenu = () => {};
