/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-09-26 15:37:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/db/user.js
 */
import { connection, exec, CheckTable } from "@/db";
// 添加用户
const addUser = async ({ name, phone, password }) => {
  const sql = "INSERT INTO user SET ?";
  return await exec(sql, { name, phone, password });
};

//查询用户
const queryUser = async (andConditionData = {}, orConditionData = {}, sql) => {
  const andKeys = Object.keys(andConditionData);
  const orKeys = Object.keys(orConditionData);
  if (sql) {
    return await exec(sql);
  }
  sql = `select * from user where `;

  andKeys.forEach((key) => {
    sql +=
      key == "password"
        ? ` ${key}=md5('${andConditionData[key]}') and`
        : ` ${key}='${andConditionData[key]}' and`;
  });

  orKeys.forEach((key) => {
    sql +=
      key == "password"
        ? ` ${key}=md5('${orConditionData[key]}') or`
        : ` ${key}='${orConditionData[key]}' or`;
  });
  sql =
    andKeys.length >= 1 && orKeys.length == 0
      ? sql.substring(0, sql.length - 3)
      : orKeys.length >= 1
      ? sql.substring(0, sql.length - 2)
      : sql;

  return await exec(sql);
};

//删除用户
const removeUser = async (id) => {
  const sql = `DELETE  FROM user  WHERE id=${id};`;
  return await exec(sql);
};

// 导出
export { addUser, removeUser, queryUser };
