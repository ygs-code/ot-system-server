/*
 * @Author: your name
 * @Date: 2020-12-07 09:39:49
 * @LastEditTime: 2021-09-28 11:11:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/db/mysql.js
 */
import mysql from "mysql";
import { MYSQL_CONF } from "../config/index";

// 创建链接对象
const connection = mysql.createConnection(MYSQL_CONF);
// 统一执行 sql 的函数  文档 https://github.com/mysqljs/mysql
const exec = async function () {
  const parameter = arguments;
  return await new Promise((resolve, reject) => {
    connection.query(...parameter, (err, result) => {
        console.log('err=',err)
        console.log('result=',result)
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export { connection, exec };
