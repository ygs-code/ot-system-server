/*
 * @Author: your name
 * @Date: 2020-12-28 16:02:26
 * @LastEditTime: 2022-06-09 11:49:09
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/bizMod/set/bizMod/user/graphql/schema/resolvers/Query/index.js
 */
import { outHttpLog } from '@/utils';
import { addUser, removeUser, queryUser } from '@/bizMod/set/db';
import userController from '@/bizMod/set/bizMod/user/controller';
import { forbidden, success } from '@/constant/httpCode';
import {
    createToken,
    verifyToken,
    getTokenUserInfo,
    destroyToken,
} from '@/redis/index';

export const getUserInfo = async (root, parameter, source, fieldASTs) => {
    const { ctx = {} } = root;
    let {
        request,
        query: { query: clientSchema = '', operationName: queryOperationName },
        cookies,
        response,
        method,
    } = ctx;
    const {
        body: { query, mutation, operationName: bodyOperationName },
        header,
    } = request;
    const { id } = parameter || {};

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
                console.log('value111======', value);
                return value;
                // await next();
            })
            .catch((error) => {
                // response.userInfo = null;
                return {
                    ...unauthorized,
                    message: '登录回话已过期，请重新登录',
                };
            });
console.log('data============',data)
        return {
            ...success,
            data,
        };
    }
};

export const getVerifyCode = async (root, parameter, source, fieldASTs) => {
    const { ctx, next } = root;
    const { request, response } = ctx;
    const { id } = parameter || {};

    //  //添加service
    const data = await userController.getVerifyCode(ctx, next, parameter);

    return {
        code: 200,
        data,
        message: '验证码获取成功',
    };
};

// 登录接口
export const login = async (root, parameter, source, fieldASTs) => {
    const { ctx, next } = root;
    const { request, response } = ctx;
    const { id } = parameter || {};

    //   //添加service
    const data = await userController.login(ctx, next, parameter);

    return data;
};
