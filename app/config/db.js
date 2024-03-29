const env = process.env.NODE_ENV; // 环境参数
let MYSQL_CONF = null;
let { MYSQL_ADDRESS } = process.env; // 环境参数
if (env === "development") {
  MYSQL_CONF = {
    host: MYSQL_ADDRESS,
    user: "root",
    password: "123456",
    port: "3306",
    database: "admin",
    // charset: 'utf8mb4', //字符集一定要写，否则表情包存储不了
    multipleStatements: true, // 是否许一个query中有多个MySQL语句 （默认：false）
    supportBigNumbers: true,
    bigNumberStrings: true,
    useConnectionPooling: true
    // debug: true
  };
}
if (env === "production") {
  MYSQL_CONF = {
    host: MYSQL_ADDRESS,
    user: "root",
    password: "123456",
    port: "3306",
    database: "admin",
    // charset: "utf8mb4", //字符集一定要写，否则表情包存储不了
    multipleStatements: true, // 是否许一个query中有多个MySQL语句 （默认：false）
    supportBigNumbers: true,
    bigNumberStrings: true,
    useConnectionPooling: true
    // debug: true
  };
}
export { MYSQL_CONF };
