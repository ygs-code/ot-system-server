/*
 * @Author: your name
 * @Date: 2020-12-02 15:48:50
 * @LastEditTime: 2021-08-23 15:37:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/constant/httpCode.js
 */
const graphqlError = {
  //语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。
  code: 400,
  message: "请求参数有误，graphql语法错误",
};

const unsupported = {
  //对于当前请求的方法和所请求的资源，请求中提交的实体并不是服务器中所支持的格式，因此请求被拒绝。
  code: 415,
  message: "服务器已经理解请求，但是拒绝执行它",
};

const unauthorized = {
  // 当前请求需要用户验证. 如果验证不通过则返回401
  code: 401,
  message: "当前请求需要用户验证.",
};

export { graphqlError, unsupported, unauthorized };
