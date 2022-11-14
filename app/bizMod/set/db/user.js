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
// 密码加密
const hmac = jwa("HS256");
// 添加用户
const addUser = async ({ name, phone, password, email }) => {
  const sql = "INSERT INTO t_user SET ?";
  return await exec(sql, {
    email,
    name,
    phone,
    password: hmac.sign(password, ""),
  });
};

//查询用户  可以单独查询 id name  phone password
const queryUser = async (data) => {
  const { id, name, phone, password, email } = data;
  // id 查询 名称查询，手机查询, 用户名+密码查询
  let sql = "";
  let nameField =
    (id && "id") ||
    (name && "name") ||
    (phone && "phone") ||
    (email && "email") ||
    "";
  // 登录情况
  if (nameField && password) {
    sql = `select * from t_user where ${nameField} =${connection.escape(
      data[nameField]
    )}  and  password=${connection.escape(hmac.sign(password, ""))}`;
    return await exec(sql);
  }

  if (nameField) {
    sql = `select * from t_user where ${nameField} =?`;
    return await exec(sql, [data[nameField]]);
  }
};

//删除用户
const removeUser = async (id) => {
  const sql = `DELETE  FROM  t_user  WHERE ?;`;
  return await exec(sql, { id });
};

// 导出
export { addUser, removeUser, queryUser };
