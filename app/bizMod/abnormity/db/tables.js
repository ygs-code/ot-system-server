/*
 * @Author: your name
 * @Date: 2021-09-24 11:32:40
 * @LastEditTime: 2021-09-24 11:32:41
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
  {
    name: "collect",
    sql: `
       CREATE TABLE collect(
            id INT(11) PRIMARY KEY,
            name VARCHAR(25)  NOT NULL,
            phone INT(11)  NOT NULL,
            user_id INT(11)  NOT NULL,
            FOREIGN KEY(user_id) REFERENCES user(id)
       );
       `,
  },
  {
    name: "code",
    sql: `
        CREATE TABLE code(
          id INT(11) PRIMARY KEY,
          name VARCHAR(25),
          collect_id INT(11),
          FOREIGN KEY(collect_id) REFERENCES collect(id),
          user_id INT(11),
          FOREIGN KEY(user_id) REFERENCES user(id)
          );
        `,
  },
  {
    name: "role",
    sql: `
      CREATE TABLE role(
        id INT(11) PRIMARY KEY,
        name VARCHAR(25),
        root TINYINT(2)
        );
      `,
  },
];
