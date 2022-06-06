import { connection, exec } from "./mysql";
const { MYSQL_CONF } = require("../config/db");

class CheckTable {
  constructor() {
    this.tables = [
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
          name: 'collect',
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
          name: 'code',
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
        name: 'role',
        sql: `
        CREATE TABLE role(
          id INT(11) PRIMARY KEY,
          name VARCHAR(25),
          root TINYINT(2)
          );
        `,
       },
    ];
    this.init();
  }
  init() {
    this.tables.forEach((table) => {
      this.queryTable(table);
    });
  }
  createTable() {}
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
