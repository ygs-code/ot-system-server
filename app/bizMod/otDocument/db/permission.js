/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-09-28 11:14:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/db/user.js
 */

import DB, {  exec, mergeCondition, sqlObjToAnd } from "@/db";

// 添加权限
export const addPermission = async ({
  name,
  description,
  auth_key,
  parent_id
}) => {
  const sql = "INSERT INTO permission SET ?";
  return await exec(sql, {
    name,
    description,
    auth_key,
    parent_id
  });
};

//查询权限  可以单独查询 id name  phone password
export const queryPermission = async (data) => {
  const condition = sqlObjToAnd(data);

  // id 查询 名称查询，手机查询, 权限名+密码查询
  let sql = `
    select 
        id,   # 如果这里是查询所有则为*
        name, 
        description,
        auth_key  authKey,
        parent_id  parentId,
        DATE_FORMAT(create_time, "%Y-%m-%d %H:%i:%S")  createTime,
        DATE_FORMAT(update_time, "%Y-%m-%d %H:%i:%S")  updateTime
    from permission where
  `;

  if (condition) {
    sql += `${condition}`;
  }

  return await exec(sql);
};

//删除权限
export const removePermission = async (id) => {
  const sql = `DELETE  FROM  permission  WHERE ?;`;
  return await exec(sql, { id });
};

// 查询权限列表
export const queryPermissionList = async (options = {}, page = {}) => {
  const { pageNum = 1, pageSize = 10 } = page;

  let sql = `SELECT  SQL_CALC_FOUND_ROWS
                id,   # 如果这里是查询所有则为*
                name, 
                description,
                auth_key   authKey,
                parent_id   parentId ,
                DATE_FORMAT(create_time, "%Y-%m-%d %H:%i:%S")  createTime,
                DATE_FORMAT(update_time, "%Y-%m-%d %H:%i:%S")  updateTime
            FROM permission 
           `;

  sql += mergeCondition(options);

  sql += `  ORDER BY update_time DESC  limit ${DB.connection.escape(
    (pageNum - 1) * pageSize
  )}, ${DB.connection.escape(pageSize)};`;

  // total 查询
  sql += ` SELECT FOUND_ROWS() as total;`;

  return await exec(sql);
};
// 编辑权限
export const editPermission = async (parameter) => {
  const { description, id, name, parent_id, auth_key } = parameter;
  let sql = `
   UPDATE permission 
    SET 
      description = ${DB.connection.escape(description)}, 
      parent_id = ${DB.connection.escape(parent_id)}, 
      auth_key = ${DB.connection.escape(auth_key)}, 
      name =  ${DB.connection.escape(name)}
   WHERE id = ${DB.connection.escape(id)}
    `;
  return await exec(sql);
};
