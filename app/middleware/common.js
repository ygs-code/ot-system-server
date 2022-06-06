/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-08-17 17:25:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/middleware/common.js
 */
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import cookie from "koa-cookie";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const getColors = (keys) => {
  const styles = {
    bright: "\x1B[1m", // 亮色
    grey: "\x1B[2m", // 灰色
    italic: "\x1B[3m", // 斜体
    underline: "\x1B[4m", // 下划线
    reverse: "\x1B[7m", // 反向
    hidden: "\x1B[8m", // 隐藏
    black: "\x1B[30m", // 黑色
    red: "\x1B[31m", // 红色
    green: "\x1B[32m", // 绿色
    yellow: "\x1B[33m", // 黄色
    blue: "\x1B[34m", // 蓝色
    magenta: "\x1B[35m", // 品红
    cyan: "\x1B[36m", // 青色
    white: "\x1B[37m", // 白色
    blackBG: "\x1B[40m", // 背景色为黑色
    redBG: "\x1B[41m", // 背景色为红色
    greenBG: "\x1B[42m", // 背景色为绿色
    yellowBG: "\x1B[43m", // 背景色为黄色
    blueBG: "\x1B[44m", // 背景色为蓝色
    magentaBG: "\x1B[45m", // 背景色为品红
    cyanBG: "\x1B[46m", // 背景色为青色
    whiteBG: "\x1B[47m", // 背景色为白色
  };
  let colors = "";
  if (typeof keys === "string") {
    colors = styles[keys];
  } else {
    keys.forEach((key) => {
      colors += styles[key];
    });
  }
  return colors;
};
const LinkLog = (requestId, options = {}) => {
  return {
    debug: (...ags) => {
      console.debug(
        `${getColors("blue")}`,
        `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`,
        `[request-id:${requestId}]`,
        "[DEBUG]",
        ...ags
      );
    },
    warn: (...ags) => {
      console.warn(
        `${getColors("yellow")}`,
        `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`,
        `[request-id:${requestId}]`,
        "[WARN]",
        ...ags
      );
    },
    info: (...ags) => {
      console.info(
        `${getColors("green")}`,
        `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`,
        `[request-id:${requestId}]`,
        "[INFO]",
        ...ags
      );
    },
    log: (...ags) => {
      console.log(
        `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`,
        `[request-id:${requestId}]`,
        "[LOG]",
        ...ags
      );
    },
    error: (...ags) => {
      console.error(
        `${getColors("red")}`,
        `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`,
        `[request-id:${requestId}]`,
        "[ERROR]",
        ...ags
      );
    },
  };
};
const common = (app, router) => {
  // 处理404
  // app.use(function* (next) {
  //     try {
  //         yield* next;
  //     } catch (e) {
  //         this.status = 500;
  //         this.body = '500';
  //     }
  //     if (parseInt(this.status) === 404) {
  //         this.body = '404';
  //     }
  // });

  //处理500
  // router.get('/', function* (next) {
  //     throw new Error('500');
  // });

  // 添加获取参数中间件
  app.use(bodyParser());
  // 添加 cookie
  app.use(cookie());
  // 添加跨域
  // app.use(async (ctx, next) => {
  //     console.log(ctx.request.headers);
  //     // if( req.headers.origin.toLowerCase() == "http://www.zhangpeiyue.com"
  //     //     || req.headers.origin.toLowerCase() =="http://127.0.0.1" ) {
  //     //     //设置允许跨域的域名，*代表允许任意域名跨域
  //     //     res.header("Access-Control-Allow-Origin", req.headers.origin);
  //     // }
  //     ctx.set('Cache-Control','no-cache')
  //     //设置允许跨域的域名，*代表允许任意域名跨域
  //     ctx.set('Access-Control-Allow-Origin', '*');
  //     //允许的header类型
  //     ctx.set('Access-Control-Allow-Headers', 'content-type');

  //     // 设置 跨域 cookie
  //  ctx.set('Access-Control-Allow-Credentials', true);

  //     //跨域允许的请求方式
  //     ctx.set('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  //     //     ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  //     //     ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  //     // await next();
  //     if (ctx.method == 'OPTIONS') {
  //         ctx.body = 200;
  //     } else {
  //         await next();
  //     }
  // });
  // 跨域
  app.use(
    cors({
      // origin: ['http://localhost:3000','http://127.0.0.1:3000'],    // 前端地址
      credentials: true,
    })
  );

  app.use(async (ctx, next) => {
    const {
      request: { header },
      cookies,
      response,
    } = ctx;
    // 设置响应字段
    const requestId = header["request-id"] || uuidv4();
    // ctx.set('Content-Type', 'application/zip')  // 修改
    response.append("request-id", requestId); // 添加新字段
    response.console = LinkLog(requestId);
    await next();
  });
};

export default common;
