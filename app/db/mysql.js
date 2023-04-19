/*
 * @Author: your name
 * @Date: 2020-12-07 09:39:49
 * @LastEditTime: 2022-06-09 11:47:09
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/db/mysql.js
 */
import mysql from "mysql";

import { MYSQL_CONF } from "../config/index";

class DB {
  static createConnection = (callback = () => {}) => {
    if (DB.connection) {
      DB.connection.destroy();
      DB.connection = null;
    }
    DB.connection = mysql.createConnection(MYSQL_CONF);
    DB.connection.connect((err) => {
      if (err) {
        console.log("Mysql数据库连失败");
        callback(err);
        clearTimeout(DB.connectionTimer);
        DB.connectionTimer = setTimeout(() => {
          DB.createConnection(callback);
        }, 2000);
        return false;
      }
      console.log("Mysql数据库连接成功");
      callback();
    });
    DB.onError(callback, DB.connection);
    DB.ping(DB.connection);
    return DB.connection;
  };
  static onError = (callback, connection) => {
    connection.on("error", (err) => {
      console.log("err===", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        this.createConnection(callback);
      } else {
        console.log("err:", err);
      }
    });
  };
  static ping = (connection) => {
    // 每个小时ping一次数据库，保持数据库连接状态
    clearInterval(DB.pingInterval);
    // 每个小时ping一次数据库，保持数据库连接状态
    DB.pingInterval = setInterval(() => {
      connection.ping((err) => {
        if (err) {
          console.log("ping error: " + JSON.stringify(err));
        }
      });
    }, 3600000 * 3);
  };
  static exec = async (...ags) => {
    const parameter = ags;
    return await new Promise((resolve, reject) => {
      this.connection.query(...parameter, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  };
}

const { connection, exec, createConnection } = DB;

export default DB;

export { connection, exec, createConnection };
