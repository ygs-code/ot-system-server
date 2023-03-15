/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-09-28 11:14:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/db/user.js
 */

import { connection, exec, mergeCondition, sqlObjToAnd } from "@/db";

// 添加用户
export const addRole = async ({ description, name }) => {
  const sql = "INSERT INTO role SET ?";
  return await exec(sql, {
    description,
    name
  });
};

//查询用户  可以单独查询 id name  phone password
export const queryRole = async (data) => {
  const condition = sqlObjToAnd(data);

  // id 查询 名称查询，手机查询, 用户名+密码查询
  let sql = `
    select 
      id,   # 如果这里是查询所有则为*
      name, 
      description,
      DATE_FORMAT(create_time, "%Y-%m-%d %H:%i:%S")  createTime,
      DATE_FORMAT(update_time, "%Y-%m-%d %H:%i:%S")  updateTime
    from role where
  `;

  if (condition) {
    sql += `${condition}`;
  }

  return await exec(sql);
};

//删除用户
export const removeRole = async (id) => {
  const sql = `DELETE  FROM  role  WHERE ?;`;
  return await exec(sql, { id });
};

// // 查询用户权限
// export const queryUserRolePermission = async (id) => {
//   const sql = `
//     SELECT
//       DISTINCT
//               p.id permissionId,  #重命名
//               p.name permissionName , #重命名
//               p.description permissionDescription , #重命名
//               p.auth_key permissionAuthKey , #重命名
//               u.id  userId, #重命名
//               u.name userName , #重命名
//               r.id roleId,  #重命名
//               r.name roleName,  #重命名
//               r.description roleDescription   #重命名
//     FROM
//       user u, #缩写表
//       role r,  #缩写表
//       user_role ur,  #缩写表
//       permission p, #缩写表
//       role_permission  rp #缩写表
//     WHERE
//       u.id = ${connection.escape(
//         id
//       )} AND u.id=ur.user_id AND r.id=ur.role_id AND r.id=rp.role_id  AND p.id=rp.permission_id;  #查询条件
//   `;

//   return await exec(sql);
// };

// 查询用户列表
export const queryRoleList = async (options = {}, page = {}) => {
  const { pageNum = 1, pageSize = 10 } = page;

  let sql = `SELECT  SQL_CALC_FOUND_ROWS
                id,   # 如果这里是查询所有则为*
                name, 
                description,
                DATE_FORMAT(create_time, "%Y-%m-%d %H:%i:%S")  createTime,
                DATE_FORMAT(update_time, "%Y-%m-%d %H:%i:%S")  updateTime
            FROM role 
           `;

  sql += mergeCondition(options);

  sql += `  ORDER BY update_time DESC  limit ${connection.escape(
    (pageNum - 1) * pageSize
  )}, ${connection.escape(pageSize)};`;

  // total 查询
  sql += ` SELECT FOUND_ROWS() as total;`;

  return await exec(sql);
};
// 编辑用户
export const editRole = async (parameter) => {
  const { description, id, name } = parameter;
  let sql = `
   UPDATE role 
    SET 
      description = ${connection.escape(description)}, 
      name =  ${connection.escape(name)}
   WHERE id = ${connection.escape(id)}
    `;
  return await exec(sql);
};
