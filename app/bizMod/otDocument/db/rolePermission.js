/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-09-28 11:14:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/db/user.js
 */

import { connection, exec, mergeCondition } from "@/db";

// 添加
export const addRolePermission = async ({ role_id, permission_id }) => {
  const sql = "INSERT INTO role_permission SET ?";

  return await exec(sql, {
    role_id,
    permission_id
    // password: hmac.sign(password, "")
  });
};

//删除
export const removeRolePermission = async ({ role_id, permission_id }) => {
  let sql = "DELETE  FROM  role_permission  ";

  sql += mergeCondition({
    and: {
      role_id,
      permission_id
    }
    // andLike: { name }
  });

  return await exec(sql);
};

// 查询 列表
export const queryRolePermissionList = async (options = {}, page = {}) => {
  const { pageNum = 1, pageSize = 10 } = page;

  let sql = `SELECT  SQL_CALC_FOUND_ROWS
                id,   # 如果这里是查询所有则为*
                permission_id   permissionId,
                role_id   roleId,
                DATE_FORMAT(create_time, "%Y-%m-%d %H:%i:%S")  createTime,
                DATE_FORMAT(update_time, "%Y-%m-%d %H:%i:%S")  updateTime
            FROM role_permission 
           `;

  sql += mergeCondition(options);

  sql += `  ORDER BY update_time DESC  limit ${connection.escape(
    (pageNum - 1) * pageSize
  )}, ${connection.escape(pageSize)};`;
  // total 查询
  sql += ` SELECT FOUND_ROWS() as total;`;

  return await exec(sql);
};
