/*
 * @Author: your name
 * @Date: 2020-12-28 16:02:26
 * @LastEditTime: 2022-06-09 11:49:09
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/bizMod/set/bizMod/user/graphql/schema/resolvers/Query/index.js
 */
import { outHttpLog } from '@/utils';
import { addUser, removeUser, queryUser, queryUserList } from '@/bizMod/set/db';
import userController from '@/bizMod/set/bizMod/user/controller';
import { forbidden, success } from '@/constant/httpCode';
import {
    createToken,
    verifyToken,
    getTokenUserInfo,
    destroyToken,
} from '@/redis/index';

export const getUserList = async (root, parameter, source, fieldASTs) => {
    const { ctx = {}, next } = root;

    // 获取用户
    return await userController.queryList(ctx, next, parameter);

    // outHttpLog({
    //   source,
    //   response,
    //   __filename,
    // });

    if (id) {
        return await queryUser({
            id,
        })
            .then((userInfo) => {
                userInfo = userInfo.length >= 1 ? userInfo[0] : null;
                return userInfo
                    ? {
                          ...success,
                          data: userInfo,
                      }
                    : {
                          ...forbidden,
                          message: '用户id不正确，查询不到对应用户信息',
                          data: userInfo,
                      };
            })
            .catch((error) => {
                return {
                    ...forbidden,
                    message: '用户id不正确，查询不到对应用户信息',
                };
            });
    } else {
        const token = cookies.get('token') || header.token;
        let data = await verifyToken(token)
            .then(async (value) => {
                return value;
                // await next();
            })
            .catch((error) => {
                return {
                    ...unauthorized,
                    message: '登录回话已过期，请重新登录',
                };
            });
        return {
            ...success,
            data,
        };
    }
};

// 获取用户信息
export const getUserInfo = async (root, parameter, source, fieldASTs) => {
    const { ctx = {}, next = {} } = root;

    // 获取用户
    return await userController.query(ctx, next, parameter);
};

// 获取验证码
export const getVerifyCode = async (root, parameter, source, fieldASTs) => {
    const { ctx, next } = root;
    const { request, response } = ctx;
    const { id } = parameter || {};

    //  //添加service
    const data = await userController.getVerifyCode(ctx, next, parameter);

    return data;
};

// 登录接口
export const login = async (root, parameter, source, fieldASTs) => {
    const { ctx, next } = root;
    const { request, response } = ctx;
    const { id } = parameter || {};

    //    登录
    const data = await userController.login(ctx, next, parameter);

    return data;
};
