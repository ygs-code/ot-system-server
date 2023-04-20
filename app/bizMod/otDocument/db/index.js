/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-09-24 11:55:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/db/index.js
 */

import initTable from "./sql/initTable.sql";
import initTableData from "./sql/initTableData.sql";

export * from "./document";
export { exec } from "@/db";

export { initTable, initTableData };
