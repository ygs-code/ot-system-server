/*
 * @Author: your name
 * @Date: 2020-12-28 16:02:26
 * @LastEditTime: 2021-08-18 11:51:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/bizMod/abnormity/bizMod/user/graphql/schema/resolvers/Query/index.js
 */
 

// export const UnionUserId = {
//   __resolveType(obj, context, info){
//     // console.log('__resolveType==')
//     // console.log('obj==',obj)
//     // console.log('context==',context)
//     // console.log('info==',info)
//     // console.log(obj, context, info)
//     // 根据unionName参数返回不同的union 模式  Person或者Photo
//     if(obj.unionName=='Photo'){
//       return 'Photo'
//     }
//     if(obj.unionName=='Person'){
//       return 'Person'
//     }
//     return null
//   }
// }