import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} from "graphql/type";
//会员模块
import user from "./user";
import home from "./home";


const checkSchemaName =   (name)=> {
  const cacheKey = [];
  return function (target) {
    for (let i = 1; i < arguments.length; i++) {
      let source = arguments[i];
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (cacheKey.includes(key)) {
            throw new Error(`graphql schema 中 ${name} ${key} 方法名称重复,请重新命名。`);
          }
          cacheKey.push(key);
          target[key] = source[key];
        }
      }
    }
    return target;
  };
};

const checkQuerySchemaName = checkSchemaName('query');
const checkMutationSchemaName = checkSchemaName('mutation');
// console.log('checkQuerySchemaName({}, user.query)=',checkQuerySchemaName({}, user.query))
export default new GraphQLSchema({
  //query 查询
  query: new GraphQLObjectType({
    name: "Query",
    fields: checkQuerySchemaName({}, user.query),
  }),
  // mutation 变异
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: checkMutationSchemaName({}, user.mutation),
  }),
});

