/*
 * @Author: your name
 * @Date: 2021-09-24 12:29:19
 * @LastEditTime: 2021-09-24 15:30:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/index/db/tables.js
 */

export default [
  {
    name: "menu",
    sql: `CREATE TABLE menu(
                  id INT(11) PRIMARY KEY  auto_increment primary key   COMMENT '主键ID',
                  parent_id INT(11)  COMMENT '父菜单ID',
                  title VARCHAR(25)  COMMENT '菜单标题',
                  type TINYINT(3)    COMMENT '菜单类型',
                  create_time timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                  update_time timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间'
              ) AUTO_INCREMENT=1;
         `,
  },
];
