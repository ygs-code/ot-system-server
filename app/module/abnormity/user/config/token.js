import { tokenExpires } from './constant';

export const setExpirationTime = () => {
    const millisecond = new Date().getTime();
    const expiresTime = new Date(millisecond + tokenExpires); //一天后过期

    return  expiresTime // da.toUTCString(); //将 1598789234953这种格式的转换成=> "Sat, 29 Aug 2020 12:06:33 GMT"
};
