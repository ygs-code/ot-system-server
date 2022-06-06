const env = process.env.NODE_ENV  // 环境参数
let REDIS_CONF = null

if (env === 'development') {
    REDIS_CONF = {
        host: '127.0.0.1', //地址
        port: '6378', // 端口
        options:{
            auth_pass: 123456 // 密码
        }
    }
}
if (env === 'production') {
    REDIS_CONF = {
        host: '127.0.0.1',
        port: '6378',
        options:{
            auth_pass: 123456
        }
    }
}

module.exports = {
    REDIS_CONF
}

