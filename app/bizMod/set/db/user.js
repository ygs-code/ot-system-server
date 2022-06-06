/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-09-28 11:14:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/db/user.js
 */
import jwa from "jwa";
import { connection, exec, CheckTable } from "@/db";

const hmac = jwa("HS256");
// 添加用户
const addUser = async ({ name, phone, password }) => {
  const sql = "INSERT INTO user SET ?";
  return await exec(sql, {
    name,
    phone,
    password: hmac.sign(password, ""),
  });
};

//查询用户
const queryUser = async (data) => {
  const { id, name, phone, password } = data;
  // id 查询 名称查询，手机查询, 用户名+密码查询
  let sql = "";
  let whereConditions = "";
  if (name && password) {
    sql = `select * from user where name =${connection.escape(
      name
    )}  and  password=${connection.escape(hmac.sign(password, ""))}`;
    return await exec(sql);
  }

  whereConditions =
    (id && "id") ||
    (name && "name") ||
    (phone && "phone") ||
    (password && "password") ||
    "";

  if (whereConditions) {
    sql = `select * from user where ${whereConditions} =?`;
    return await exec(sql, [
      whereConditions === "password"
        ? hmac.sign(password, "")
        : data[whereConditions],
    ]);
  }
};

//删除用户
const removeUser = async (id) => {
  const sql = `DELETE  FROM  user  WHERE ?;`;
  return await exec(sql, { id });
};

// 导出
export { addUser, removeUser, queryUser };
