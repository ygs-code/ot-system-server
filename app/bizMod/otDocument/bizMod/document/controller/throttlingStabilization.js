/*
 * @Date: 2022-08-11 09:41:40
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 15:54:43
 * @FilePath: /react-loading-ssr/client/utils/throttlingStabilization.js
 * @Description:
 */

// 节流函数
const throttle = () => {
    let startTime = null;
    return (time, callback = () => {}) =>
        new Promise((resolve) => {
            const nowTime = new Date().getTime();
            if (!startTime || nowTime - startTime > time) {
                startTime = nowTime;
                if (callback && callback instanceof Function) {
                    callback();
                }

                resolve();
            }
        });
};

// 防抖函数
const stabilization = () => {
    let timer = null;
    return (time, callback) =>
        new Promise((resolve) => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                if (callback && callback instanceof Function) {
                    callback();
                }

                resolve();
            }, time);
        });
};

module.exports = {
    throttle,
    stabilization,
};
