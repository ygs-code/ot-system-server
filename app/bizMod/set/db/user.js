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
  const sql = "INSERT INTO user SET ?";
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
    sql = `select * from user where ${nameField}=${connection.escape(
      data[nameField]
    )}  and  password=${connection.escape(hmac.sign(password, ""))}`;
    return await exec(sql);
  }

  if (nameField) {
    sql = `select * from user where ${nameField}=?`;
    return await exec(sql, [data[nameField]]);
  }
};

//删除用户
const removeUser = async (id) => {
  const sql = `DELETE  FROM  user  WHERE ?;`;
  return await exec(sql, { id });
};

const queryUserRolePermission = async (id) => {
  const sql = `
SELECT
  DISTINCT
           p.id permissionId,  #重命名
           p.name permissionName , #重命名
           p.description permissionDescription , #重命名
           p.auth_key permissionAuthKey , #重命名
           p.parent_auth_key  permissionParentAuthKey, #重命名
           u.id  userId, #重命名
           u.name userName , #重命名
           r.id roleId,  #重命名
           r.name roleName,  #重命名
           r.description roleDescription   #重命名   
FROM
   user u, #缩写表
   role r,  #缩写表
   user_role ur,  #缩写表
   permission p, #缩写表
   role_permission  rp #缩写表
WHERE
   u.id = ${connection.escape(
     id
   )} AND u.id=ur.user_id AND r.id=ur.role_id AND r.id= rp.role_id  AND p.id= rp.permission_id;  #查询条件
  `;

  return await exec(sql);
};

// 导出
export { addUser, removeUser, queryUser, queryUserRolePermission };
