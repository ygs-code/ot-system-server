/*
 * @Author: your name
 * @Date: 2020-12-28 16:02:26
 * @LastEditTime: 2022-06-09 11:49:09
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/bizMod/set/bizMod/user/graphql/schema/resolvers/Query/index.js
 */
// import { outHttpLog } from "@/utils";
import { addUser, removeUser, queryUser } from '@/bizMod/set/db';
import userController from '@/bizMod/set/bizMod/user/controller';

export const getUserInfo = async (root, parameter, source, fieldASTs) => {
    const { ctx: { request, response } = {} } = root;
    const { id } = parameter || {};
    // outHttpLog({
    //   source,
    //   response,
    //   __filename,
    // });
    let data = {};
    if (id) {
        data = await queryUser({
            id,
        })
            .then((data) => {
                if (data.length && data[0]) {
                    return {
                        code: 200,
                        message: '请求成功',
                        data: data[0],
                    };
                } else {
                    return {
                        code: 200,
                        message: '查询不到用户',
                        data: null,
                    };
                }
            })
            .catch(() => {
                return {
                    code: 200,
                    message: '查询不到用户',
                    data: null,
                };
            });
    } else {
        data = {
            code: 200,
            message: '请求成功',
            data: response.userInfo,
        };
    }

    return data;
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
