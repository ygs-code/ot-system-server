/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-09-24 11:55:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/db/index.js
 */

export * from "./user";
export { connection, exec } from "@/db";

import initTable from "@/bizMod/set/db/sql/initTable.sql";
import initTableData from "@/bizMod/set/db/sql/initTableData.sql";

export { initTable, initTableData };
