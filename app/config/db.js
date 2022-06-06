const env = process.env.NODE_ENV; // 环境参数
let MYSQL_CONF = null;

if (env === 'development') {
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'admin',
        // charset:'utf8mb4',   //字符集一定要写，否则表情包存储不了
        multipleStatements: true, // 是否许一个query中有多个MySQL语句 （默认：false）
    };
}
if (env === 'production') {
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'admin',
        charset: 'utf8mb4', //字符集一定要写，否则表情包存储不了
        multipleStatements: true, // 是否许一个query中有多个MySQL语句 （默认：false）
    };
}
export { MYSQL_CONF };
