// chalk插件,用来在命令行中输入不同颜色的文字
import chalk from "chalk";
import {
  buildSchema,
  parse,
  Source,
  specifiedRules,
  validate,
  validateSchema
} from "graphql";
import { createApplication, createModule, gql } from "graphql-modules";

import language from "../language";
/*

 options 参数 说明


let $ValidateGraphql = new ValidateGraphql({

    modules: [UserModule, UserModule2, MarketingModule, LogisticsModule],
});


{
  modules:[], // 每一个子模块的 application
  returnFirst:false, //是 graphql 查询时候返回参数,是否取第一个,如果是true 那么客户端不能使用别名,也不能多接口方法查询,默认是false
  rootValue:{  //这个参数是node 上下文 可以传递request,respons,next等
    ctx: {
      request: {},
      respons: {},
    },
    next: () => {},
  },
  clientSchema: {  // 客户端 clientSchema
    schema: `
    mutation {
      # 没有参数不能写括号
      updateUser{
        id
        name
      }
    }
    `,
    variables: {   // 客户端 发送参数
      // userId: 123,

    },
    operationName: 'getUser',  // 请求方法名称
  },
}

ValidateGraphql 对象方法,可以做单元测试
   集成调用    返回 ValidateGraphql 实例
    let  $ValidateGraphql = new ValidateGraphql({
         modules: [UserModule, UserModule2, MarketingModule, LogisticsModule],
     })

     // 再调用获取校验数据
  $ValidateGraphql.init({
    rootValue: {
        ctx: {
            request: {
                setCookie() {},
            },
        },
        next: () => {},
    },
    clientSchema: {
        schema: `
    query{
      getUser {
       name
       id
       adderss

    }
  }
  `,
        variables: {},
        operationName: 'getUser',
    },
});

  高性能调用
    这样做的好处就是只校验一次服务器的Schema 而上面每次调用接口都会校验一次服务器的Schema
     const $validateGraphql = validateGraphql({
           modules: [UserModule2, UserModule, MarketingModule, LogisticsModule],
      });


$validateGraphql({
    rootValue: {
        ctx: {
            request: {
                setCookie() {},
            },
        },
        next: () => {},
    },
    clientSchema: {
        schema: `
    query{
      getUser {
       name
       id
       adderss

    }
  }
  `,
        variables: {},
        operationName: 'getUser',
    },
}).then((data) => {

});

$validateGraphql({
    rootValue: {
        ctx: {
            request: {
                setCookie() {},
            },
        },
        next: () => {},
    },
    clientSchema: {
        schema: `
    query{
        getUserTow {
       name
       id
       adderss
       type
    }
  }
  `,
        variables: {},
        operationName: 'getUserTow',
    },
}).then((data) => {

});



*/

class ValidateGraphql {
  constructor(options = {}) {
    this.options = {
      lang: "EN",
      debug: true,
      modules: [],
      ...options
    };
  }
  async init(parameters) {
    const { clientSchema } = parameters;
    // 验证resolvers是否有重复
    // await this.validateResolvers();
    // 验证服务户端Schema
    this.validateSeverSchemas();
    // 验证客户端Schema
    let documentAST = await this.validateClientSchema({ clientSchema });
    // 一起验证客户端服务端Schema
    await this.validateSeverClientSchema({
      documentAST,
      clientSchema
    });
    // 验证客户端请求${language[lang].and}服务户端一起验证
    const data = await this.validateGraphql(parameters);
    return data;
  }

  // 验证resolvers是否有重复
  validateResolvers = () => {
    // this.options = {
    //     ...this.options,
    //     ...options,
    // };
    let { modules = [], lang } = this.options;

    // 缓存
    let cacheRecord = [];
    let newModules = [];

    for (let item of modules) {
      const {
        // config: {
        id, // 模块id
        dirname, // 路劲
        typeDefs = [], //typeDefs
        resolvers = {}
        // } = {},
      } = item;

      const { Mutation = {}, Subscription = {}, Query = {} } = resolvers;
      let nowRecord = {
        id, // 模块id
        dirname, // 路劲
        typeDefs, //typeDefs
        Mutation: [],
        Subscription: [],
        Query: []
      };

      // cacheRecord.push({
      //     id, // 模块id
      //     dirname, // 路劲
      //     typeDefs, //typeDefs
      //     Mutation: [],
      //     Subscription: [],
      //     Query: [],
      // });
      let prevData = cacheRecord.find((item) => {
        return item.id === id;
      });

      if (prevData) {
        throw new Error(
          chalk.red(
            `${language[lang].moduleID}:${id}, ${language[lang].moduleID}:${dirname}${language[lang].and}${language[lang].moduleID}:${prevData.id},${language[lang].path}:${prevData.dirname}。${language[lang].their}  moduleID  ${language[lang].name}  ${prevData.id}  ${language[lang].duplicationName}。`
          )
        );
      }
      for (let key in Mutation) {
        if (Mutation.hasOwnProperty(key)) {
          prevData = cacheRecord.find((item) => {
            return item.Mutation.includes(key);
          });
          if (prevData) {
            throw new Error(
              chalk.red(
                `${language[lang].moduleID}:${id},${language[lang].moduleID}:${dirname}${language[lang].and}${language[lang].moduleID}:${prevData.id},${language[lang].path}:${prevData.dirname}。${language[lang].their}resolvers.Mutation.${key}${language[lang].duplicationName}。`
              )
            );
          }
          nowRecord.Mutation.push(key);
        }
      }
      for (let key in Query) {
        if (Query.hasOwnProperty(key)) {
          prevData = cacheRecord.find((item) => {
            return item.Query.includes(key);
          });
          if (prevData) {
            throw new Error(
              chalk.red(
                `${language[lang].moduleID}:${id},${language[lang].path}:${dirname}${language[lang].and}${language[lang].moduleID}:${prevData.id},${language[lang].path}:${prevData.dirname}。中的resolvers.Query.${key}${language[lang].duplicationName}。`
              )
            );
          }
          nowRecord.Query.push(key);
        }
      }
      for (let key in Subscription) {
        if (Subscription.hasOwnProperty(key)) {
          prevData = cacheRecord.find((item) => {
            return item.Subscription.includes(key);
          });
          if (prevData) {
            throw new Error(
              chalk.red(
                `${language[lang].moduleID}:${id},${language[lang].path}:${dirname}${language[lang].and}${language[lang].moduleID}:${prevData.id},${language[lang].path}:${prevData.dirname}。中的resolvers.Subscription.${key}${language[lang].duplicationName}。`
              )
            );
          }
          nowRecord.Subscription.push(key);
        }
      }
      //创建模块Schema
      newModules.push(createModule(this.validateSeverSchema(item)));
      // 记录缓存
      cacheRecord.push(nowRecord);
    }

    this.options = {
      ...this.options,
      modules: newModules
    };
  };

  //验证单个SeverSchema
  validateSeverSchema = (config) => {
    let { lang, debug, serverRootSchema } = this.options;
    let {
      typeDefs = [],
      id, // id不能${language[lang].and}其他模块重名
      dirname
    } = config;

    serverRootSchema =
      serverRootSchema ||
      `
                    type Query {
                        dummy: String
                    }
                    type Mutation {
                        dummy: String
                    }
                    type Subscription {
                        dummy: String
                    }
                    schema {
                        query: Query
                        mutation: Mutation
                        subscription: Subscription
                    }
        `;

    let serverSchema = serverRootSchema + typeDefs.join(" ");
    try {
      // 验证 SeverSchema
      const validateSeverSchemaInfo = validateSchema(buildSchema(serverSchema));
      if (validateSeverSchemaInfo.length > 0) {
        throw validateSeverSchemaInfo;
      }
      debug &&
        console.log(
          chalk.rgb(
            36,
            114,
            199
          )(
            `${language[lang].moduleID}:${id}, ${language[lang].schemaVerified}`
          )
        );
    } catch (error) {
      // console.error(
      //     chalk.red(
      //         `${language[lang].serverSchemaVerification},${language[lang].errorMessage}:${error} ${language[lang].moduleID}:${id},${language[lang].path}:${dirname}`
      //     )
      // );
      throw new Error(
        chalk.red(
          `${language[lang].serverSchemaVerification},${language[lang].errorMessage}:\n${error}\n${language[lang].moduleID}:${id},${language[lang].path}:${dirname} `
        )
      );
    }

    config.typeDefs = typeDefs.map((item) => {
      return gql(serverRootSchema + item);
    });
    return config;
  };

  //验证  模块化 服务器SeverSchema
  validateSeverSchemas = () => {
    // this.options = {
    //     ...this.options,
    //     ...options,
    // };

    this.validateResolvers();

    let {
      lang,
      modules = [],
      serverSchema: { schema: serverSchema = "" } = {},
      debug
    } = this.options;

    // This is your application, it contains your GraphQL schema and the implementation of it.
    this.application = createApplication({
      modules
    });
    // 获取验证函数
    this.executeFn = this.application.createExecution();

    this.options = {
      ...this.options,
      serverSchema: {
        ...serverSchema,
        schema: this.application.schema
      }
    };

    try {
      // validateSchema(buildSchema(serverSchema));
      // 验证 SeverSchema
      const validateSeverSchemaInfo = validateSchema(
        this.application.schema
        // buildSchema(this.application.schema)
      );
      if (validateSeverSchemaInfo.length > 0) {
        throw validateSeverSchemaInfo;
      }
      debug &&
        console.log(
          chalk.rgb(
            36,
            114,
            199
          )(`modules application , ${language[lang].schemaVerified}`)
        );
    } catch (error) {
      // console.error(chalk.red('${language[lang].serverSchemaVerification}:', error));
      throw new Error(
        chalk.red(`${language[lang].serverSchemaVerification}:\n` + error)
      );
    }
  };

  // 验证 客户端ClientSchema
  validateClientSchema = async (options = {}) => {
    // this.options = {
    //     ...this.options,
    //     ...options,
    // };
    let {
      // clientSchema: {
      //     schema: clientSchema = '',
      //     variables = {},
      //     operationName,
      // } = {},
      lang,
      debug
    } = this.options;

    let {
      // serverSchema: { schema: serverSchema = '', resolvers = {} } = {},
      clientSchema: { schema: clientSchema, operationName } = {}
    } = options;

    let documentAST = null;

    if (operationName === undefined) {
      // console.error(chalk.red('${language[lang].validateClientFailed},operationName不能为空'));
      throw new Error(
        chalk.red(
          `${language[lang].validateClientFailed},operationName${language[lang].canNotEmpty}`
        )
      );
    }

    const source = new Source(clientSchema, "GraphQL request");
    try {
      // 验证客户端 schema
      documentAST = parse(source);
      debug &&
        console.log(
          chalk.rgb(36, 114, 199)(`${language[lang].verifyClientSchemaPasses}`)
        );
    } catch (syntaxError) {
      // console.error(chalk.red('${language[lang].validateClientFailed}:', syntaxError));
      throw new Error(
        chalk.red(`${language[lang].validateClientFailed}:` + syntaxError)
      );
    }

    return documentAST;
  };
  // 验证 服务端,客户端SeverClientSchema
  validateSeverClientSchema = async (options = {}) => {
    // this.options = {
    //     ...this.options,
    //     ...options,
    // };
    let {
      serverSchema: { schema: serverSchema = "" } = {},
      // clientSchema: { schema: clientSchema = '', variables = {} } = {},
      lang,
      debug
    } = this.options;

    let {
      // serverSchema: { schema: serverSchema = '', resolvers = {} } = {},

      documentAST
    } = options;

    try {
      //服务端的schema和客户端的schema 一起验证
      const validationErrors = validate(
        serverSchema,
        documentAST,
        specifiedRules
      );
      if (validationErrors.length > 0) {
        throw validationErrors;
      }
      debug &&
        console.log(
          chalk.rgb(
            36,
            114,
            199
          )(`${language[lang].serverClientSchemaVerified}`)
        );
    } catch (syntaxError) {
      // console.error(
      //     chalk.red(
      //         '${language[lang].serverClientSchemaValidationFails}:',
      //         syntaxError
      //     )
      // );
      throw new Error(
        chalk.red(
          `${language[lang].serverClientSchemaValidationFails}:` + syntaxError
        )
      );
    }
  };
  // 客户端Schema和请求参数${language[lang].and}服务器的Schema校验
  validateGraphql = async (options = {}) => {
    let {
      serverSchema: { schema: serverSchema = "" } = {},
      lang,
      debug
    } = this.options;
    let {
      clientSchema: { variables = {} } = {},
      documentAST,
      returnFirst = false,
      context = {},
      rootValue = {}
    } = options;

    try {
      // 校验客户端Schema请求参数${language[lang].and}服务器的Schema是否匹配
      const value = await this.executeFn({
        schema: serverSchema,
        document: documentAST,
        rootValue: rootValue,
        contextValue: context,
        variableValues: variables
      });

      const { errors, data = {} } = value;
      if (errors) {
        throw errors;
      }

      const keys = Object.keys(data);
      debug &&
        console.log(
          chalk.rgb(
            36,
            114,
            199
          )(`${language[lang].clientServerSchemaRequestParametersVerified}`)
        );
      return returnFirst
        ? {
            ...data[keys[0]]
          }
        : data;
    } catch (errors) {
      // console.error(
      //   chalk.red(
      //     "客户端Schema和请求参数${language[lang].and}服务器的Schema校验失败errors:" +
      //       errors
      //   )
      // );
      throw new Error(
        chalk.red(
          `${language[lang].clientServerSchemaRequestParametersVerifiedFailed}errors:` +
            errors
        )
      );
    }
  };
}
const validateGraphql = (options) => {
  const { modules = [], lang = "EN", debug = true } = options;
  let $validateGraphql = new ValidateGraphql({
    ...options,
    debug,
    lang,
    modules
  });

  $validateGraphql.validateSeverSchemas();

  return async (parameters) => {
    const { clientSchema } = parameters;
    let documentAST = await $validateGraphql.validateClientSchema(parameters);

    await $validateGraphql.validateSeverClientSchema({
      documentAST,
      clientSchema
    });
    return await $validateGraphql.validateGraphql({
      ...parameters,
      documentAST
    });
  };
};
export { validateGraphql };
export default ValidateGraphql;
