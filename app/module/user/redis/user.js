import {userIdverifyToken,verifyToken } from "./jwt";
import { Redis, redisClient } from "./redis";
import { merge, promise } from '../utils';

// 获取用户信息
const getUserIfo = async (tokenOrId) => {
  const userIdTokens = (await userIdverifyToken(tokenOrId)) || [];
  const tokens = (await verifyToken(tokenOrId)) || [];
  const data = await Redis.get(merge(userIdTokens,tokens)[0]);
  return data;
};

export { getUserIfo };
