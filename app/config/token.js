import { tokenExpires } from "./constant";

// 设置token过期时间
export const setExpirationTime = () => {
  const millisecond = new Date().getTime();
  const expiresTime = new Date(millisecond + tokenExpires); //
  return expiresTime; //
};
