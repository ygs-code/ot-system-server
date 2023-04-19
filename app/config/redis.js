const env = process.env.NODE_ENV; // 环境参数
let REDIS_CONF = null;

let { REDIS_ADDRESS } = process.env; // 环境参数

if (env === "development") {
  REDIS_CONF = {
    host: REDIS_ADDRESS, //地址
    port: "6379", // 端口
    options: {
      auth_pass: 123456 // 密码
    }
  };
}
if (env === "production") {
  REDIS_CONF = {
    host: REDIS_ADDRESS,
    port: "6379",
    options: {
      auth_pass: 123456
    }
  };
}

module.exports = {
  REDIS_CONF
};
