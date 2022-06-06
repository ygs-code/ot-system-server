/*
 * @Author: your name
 * @Date: 2020-12-16 10:49:43
 * @LastEditTime: 2022-04-22 19:51:14
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/utils/common.js
 */
import {
  Source,
  validateSchema,
  parse,
  validate,
  execute,
  formatError,
  getOperationAST,
  specifiedRules,
  buildSchema,
} from "graphql";
// chalk插件，用来在命令行中输入不同颜色的文字
import chalk from "chalk";
import { CheckDataType } from "./CheckDataType";

const promise = (fn = () => {}) => {
  return new Promise((resolve, reject) => {
    fn(resolve, reject);
  });
};

const merge =
  Object.assign ||
  function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
const checkSchema = (name) => {
  let cache = [];
  return function checkSchemas(target) {
    for (var i = 1; i < arguments.length; i++) {
      let source = new Object({ ...arguments[i] });
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (
            Object.prototype.toString.call(source[key]) == "[object Module]" ||
            CheckDataType.isObject(source[key])
          ) {
            target[key] = {
              ...(target[key] || {}),
              ...checkSchemas(target[key] || {}, source[key] || {}),
            };
          } else {
            if (cache.includes(key)) {
              throw new Error(
                chalk.red(`graphql schema 发生 ${key}命名冲突,请重新命名${key}`)
              );
            }
            !["Mutation", "Query", "Subscription"].includes(key) &&
              cache.push(key);
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
};

const exeValidateSchema = async (schema) => {
  let errors = null;
  try {
    errors = await validateSchema(buildSchema(schema));
  } catch (error) {
    // console.error(error);
    errors = error;
  }

  return errors && errors.length === 0 ? 0 : errors;
};

const outHttpLog = ({ source, __filename, response }) => {
  const sourceKeys = Object.keys(source);
  response.console.info(
    `[http request : ${source[sourceKeys[0]].name}]`,
    `[path : /${__filename}]`
  );
}; 
const aa = function(){}
const captureClassError = () => {
  return (target) => {
    return new Proxy(target, {
      get(oTarget, sKey) {
        return ["[object Function]", "[object AsyncFunction]"].includes(
          Object.prototype.toString.call(oTarget[sKey])
        )
          ? (...ags) => {
              try {
                return oTarget[sKey].apply(target, ags);
              } catch (error) {
                // '可以发短信或者邮件给开发者'
                console.error("node js 发生错误：", error);
              }
            }
          : oTarget[sKey];
      },
      // set: function (oTarget, sKey, vValue) {

      // },
    });
  };
};

export {
  promise,
  merge,
  checkSchema,
  exeValidateSchema,
  outHttpLog,
  // captureFnError,
  captureClassError,
  // aa
};
