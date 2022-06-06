/*
 * @Author: your name
 * @Date: 2020-12-04 18:58:51
 * @LastEditTime: 2021-09-26 10:46:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/db/checkTable.js
 */
import { connection, exec } from "./mysql";
const { MYSQL_CONF } = require("../config/db");

class CheckTable {
  constructor(tables) {
    this.tables = tables;
    this.init();
  }
  init() {
    this.tables.forEach(async (table) => {
      await  this.queryTable(table);
    });
  }
  async checkTable(data, table) {
    if (data.length == 0) {
      await exec(table.sql)
        .then((data) => {
          console.log("创建表成功");
        })
        .catch((error) => {
          console.log("创建表失败=", error);
        });
    }
  }
  async queryTable(table) {
    const sql = `
           SELECT
           TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
           WHERE TABLE_SCHEMA='${MYSQL_CONF.database}' 
           AND TABLE_NAME= '${table.name}'`;
    await exec(sql)
      .then(async (data) => {
        await this.checkTable(data, table);
      })
      .catch(() => {});
  }
}

export { CheckTable };
