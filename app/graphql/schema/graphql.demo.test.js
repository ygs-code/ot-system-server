import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} from "graphql/type";
import {
  graphql,
  Source,
  validateSchema,
  parse,
  validate,
  execute,
  formatError,
  getOperationAST,
  specifiedRules,
  validationRules,
  buildSchema,
} from "graphql";
import { makeExecutableSchema } from "graphql-tools";

class Demo {
  constructor() {}
  async init() {
    await this.validateSchema();
    await this.validateGraphql();
  }
  exeValidateSchema = async (schema) => {
    let errors = null;
    try {
      errors = await validateSchema(buildSchema(schema));
    } catch (error) {
      // console.error(error);
      errors = error;
    }

    return errors && errors.length === 0 ? "validateSchema 验证通过" : errors;
  };
  validateSchema = async () => {
    const { schema: serverSchema, resolvers } = this.serverSchema();
    const validateSchemaInfo = await this.exeValidateSchema(serverSchema);
    console.log("validateSchemaInfo========", validateSchemaInfo);
  };
  serverSchema = () => {
    const rootSchema = `
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
    const schema = `
     ${rootSchema}
     \n
      type User {
        height: FOOT
        name: String
      }
      extend type Query {
        human: User
      }
   `;
    const resolvers = {
      Mutation: {},
      Query: {
        me: (root, data, source, fieldASTs) => {
          console.log("root==", root);
          console.log("data==", data);
          // console.log('source==',source)
          // console.log('fieldASTs==',fieldASTs)
          return {
            name: "hello my name is yao guan shou",
          };
        },
      },
      Subscription: {},
    };
    return {
      schema,
      resolvers,
    };
  };
  clientSchema = () => {
    const schema = `
    {
        human(id: "1000") {
          name
          height(unit: FOOT)
        }
      }
    `;
    const variables = {};
    return {
      schema,
      variables,
    };
  };
  validateGraphql = async () => {
    const { schema: serverSchema, resolvers } = this.serverSchema();
    const { schema: clientSchema, variables } = this.clientSchema();

    const schema = makeExecutableSchema({
      typeDefs: [serverSchema],
      resolvers: resolvers,
    });
    const app = {
      ctx: {
        request: {},
        respons: {},
      },
      next: () => {},
    };

    await graphql(schema, clientSchema, app, variables)
      .then((value) => {
        const { errors, data = {} } = value;
        const keys = Object.keys(data);
        if (errors) {
          console.error("graphql验证失败 errors:", errors);
          return;
        }
        console.log("graphql验证通过 data==", data[keys[0]]);
      })
      .catch((error) => {
        console.log("error==", error);
      });
  };
}
new Demo().init();
