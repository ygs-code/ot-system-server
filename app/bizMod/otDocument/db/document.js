/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-09-28 11:14:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/db/user.js
 */

import { connection, exec, mergeCondition, sqlObjToAnd } from "@/db";

// 查询权限列表
export const queryDocumentList = async (options = {}, page = {}) => {
  console.log(1111111);
  const { pageNum = 1, pageSize = 10 } = page;

  let sql = `SELECT  SQL_CALC_FOUND_ROWS
                id,   # 如果这里是查询所有则为*
                title, 
                v,
                update_by   updateBy,
                create_by   createBy,
                content,
                type,
                DATE_FORMAT(create_time, "%Y-%m-%d %H:%i:%S")  createTime,
                DATE_FORMAT(update_time, "%Y-%m-%d %H:%i:%S")  updateTime
            FROM documents 
           `;

  sql += mergeCondition(options);

  sql += `  ORDER BY update_time DESC  limit ${connection.escape(
    (pageNum - 1) * pageSize
  )}, ${connection.escape(pageSize)};`;

  // total 查询
  sql += ` SELECT FOUND_ROWS() as total;`;
  console.log("sql==", sql);
  return await exec(sql);
};

//删除文档
const removeDocument = async (table, id) => {
  const sql = `DELETE  FROM  ${table}  WHERE ?;`;
  return await exec(sql, { id });
};

// 添加文档
const createDocument = async (
  table,
  {
    id,
    create_by,
    update_by,
    title,
    v,
    type,
    content,
    create_time,
    update_time
  }
) => {
  const sql = `INSERT INTO ${table} SET ?`;

  return await exec(sql, {
    id,
    create_by,
    update_by,
    title,
    v,
    type,
    content
    // create_time,
    // update_time,
  });
};

// 编辑文档
const editDocument = async (
  table,
  {
    id,
    create_by,
    update_by,
    title,
    v,
    type,
    content,
    create_time,
    update_time
  }
) => {
  let sql = `
     UPDATE  ${table} 
        SET 
        v = ${connection.escape(v)}, 
        type =  ${connection.escape(type)}, 
        content =  ${connection.escape(content)}, 
        update_by =  ${connection.escape(update_by)}, 
        create_time =  ${connection.escape(create_time)}, 
        update_time =  ${connection.escape(update_time)}
            WHERE id = ${connection.escape(id)};
     `;
  return await exec(sql);
};

// 获取文档
const getDocument = async (table, id) => {
  let sql = `
      select 
          id,   # 如果这里是查询所有则为*
          create_by createBy, 
          update_by update_By,
          title,
          v,
          type,
          content,
          DATE_FORMAT(create_time, "%Y-%m-%d %H:%i:%S")  createTime,
          DATE_FORMAT(update_time, "%Y-%m-%d %H:%i:%S")  updateTime
      from ${table}  WHERE id = ${connection.escape(id)}
    `;

  return await exec(sql);
};

// 添加文档
const createOpsDocument = async (table, { id, ops, create_by, update_by }) => {
  const sql = `INSERT INTO ${table} SET ?`;

  return await exec(sql, {
    id,
    ops,
    create_by,
    update_by
    // create_time,
    // update_time,
  });
};

// 编辑文档
const editOpsDocument = async (table, { id, ops, update_by }) => {
  let sql = `
     UPDATE  ${table} 
        SET 
        ops =  ${connection.escape(ops)},
        update_by =  ${connection.escape(`${update_by}`)}
            WHERE id = ${connection.escape(id)};
     `;

  return await exec(sql);
};

// 获取文档
const getOpsDocument = async (table, id) => {
  let sql = `
      select  
        create_by createBy, 
        update_by update_By,
        ops,
          DATE_FORMAT(create_time, "%Y-%m-%d %H:%i:%S")  createTime,
          DATE_FORMAT(update_time, "%Y-%m-%d %H:%i:%S")  updateTime
      from ${table}  WHERE id = ${connection.escape(id)} 
    `;

  return await exec(sql);
};

export {
  createDocument,
  createOpsDocument,
  editDocument,
  editOpsDocument,
  getDocument,
  getOpsDocument,
  removeDocument
};
