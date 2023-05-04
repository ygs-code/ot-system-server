/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-09-28 11:14:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/db/user.js
 */

import DB, { exec, mergeCondition } from "@/db";

// 添加
export const addUserRole = async ({ user_id, role_id }) => {
  const sql = "INSERT INTO user_role SET ?";
  return await exec(sql, {
    user_id,
    role_id
  });
};

//删除
export const removeUserRole = async ({ user_id, role_id }) => {
  let sql = "DELETE  FROM  user_role  ";

  sql += mergeCondition({
    and: {
      user_id,
      role_id
    }
    // andLike: { name }
  });

  return await exec(sql);
};

// 查询 列表
export const queryUserRoleList = async (options = {}, page = {}) => {
  const { pageNum = 1, pageSize = 10 } = page;

  let sql = `SELECT  SQL_CALC_FOUND_ROWS
                id,   # 如果这里是查询所有则为*
                user_id   userId,
                role_id   roleId,
                DATE_FORMAT(create_time, "%Y-%m-%d %H:%i:%S")  createTime,
                DATE_FORMAT(update_time, "%Y-%m-%d %H:%i:%S")  updateTime
            FROM user_role 
           `;

  sql += mergeCondition(options);

  sql += `  ORDER BY update_time DESC  limit ${DB.connection.escape(
    (pageNum - 1) * pageSize
  )}, ${DB.connection.escape(pageSize)};`;

  // total 查询
  sql += ` SELECT FOUND_ROWS() as total;`;

  return await exec(sql);
};
