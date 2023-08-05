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
  constructor() {
    this.connection = null;
    this.connectionTimer = this.pingInterval = null;
  }
  createConnection = (callback = () => {}) => {
    if (this.connection) {
      this.connection && this.connection.destroy();
      this.connection = null;
    }
    this.connection = mysql.createConnection(MYSQL_CONF);
    this.connection.connect((err) => {
      if (err) {
        console.log("Mysql数据库连失败");
        callback(err);
        clearTimeout(this.connectionTimer);
        this.connectionTimer = setTimeout(() => {
          this.createConnection(callback);
        }, 2000);
        return false;
      }
      console.log("Mysql数据库连接成功");
      callback();
    });
    this.onError(callback, this.connection);
    this.onEnd(callback, this.connection);
    this.ping(this.connection);
    return this.connection;
  };
  onError = (callback, connection) => {
    connection.on("error", (err) => {
      console.log("err===", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        this.createConnection(callback);
      } else {
        console.log("err:", err);
      }
    });
  };
  onEnd = (callback, connection) => {
    connection.on("end", (err) => {
      if (err) {
        this.createConnection(callback);
      }
    });
  };
  ping = (connection) => {
    // 每个半小时ping一次数据库，保持数据库连接状态
    clearInterval(this.pingInterval);
    // 每个小时ping一次数据库，保持数据库连接状态
    this.pingInterval = setInterval(() => {
      connection.ping((err) => {
        if (err) {
          console.log("ping error: " + JSON.stringify(err));
        }
      });
    }, 1000 * 60 * 30);
  };
  exec = async (...ags) => {
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

const db = new DB();

const { exec, createConnection } = db;

export { createConnection, exec };

export default db;
