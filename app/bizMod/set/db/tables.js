/*
 * @Author: your name
 * @Date: 2021-09-24 11:32:40
 * @LastEditTime: 2021-09-24 12:27:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/db/tables.js
 */

export default [
  {
    name: "user",
    sql: `CREATE TABLE user(
                  id INT(11) PRIMARY KEY  auto_increment primary key,
                  name VARCHAR(25),
                  phone VARCHAR(200),
                  password VARCHAR(255)
              ) AUTO_INCREMENT=1;
         `,
  },
];
