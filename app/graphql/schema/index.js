import {
    Source,
    validateSchema,
    parse,
    validate,
    execute,
    formatError,
    getOperationAST,
    specifiedRules,
    buildSchema,
} from 'graphql';
//会员模块
import { default as userSchema } from './user';
import { schema as bizModSchema } from '../../bizMod';
import { default as rootSchema } from './typeDefs';
export { default as rootSchema } from './typeDefs';

import { checkSchema } from '@/utils';

const checkSchemas = checkSchema();

export const schema = (() => {
    let typeDefs = {
        schema: '',
        schemas: [],
    };
    let resolvers = {
        Mutation: {},
        Query: {},
        Subscription: {},
    };

    const schemas = {
        //添加最外层模块
        user: userSchema,
        bizMod: bizModSchema,
    };

    const schemaKeys = Object.keys(schemas);
    typeDefs.schema = rootSchema + '\n' + typeDefs.schema;
    for (let key of schemaKeys) {
        typeDefs.schema += schemas[key].typeDefs.schema + '\n';
        if (key !== 'bizMod') {
            typeDefs.schemas.push(schemas[key].typeDefs.schema);
        }
        checkSchemas(resolvers, schemas[key].resolvers);
    }

    typeDefs.schemas = [
        rootSchema,
        ...typeDefs.schemas,
        ...bizModSchema.typeDefs.schemas,
    ];

    //
  //   const schemaValidationErrors = validateSchema(
  //       buildSchema(`
   
  // # The dummy queries and mutations are necessary because
  // # graphql-js cannot have empty root types and we only extend
  // # these types later on
  // # Ref: apollographql/graphql-tools#293
  // type Query {
  //     dummy: String
  // }
  // type Mutation {
  //     dummy: String
  // }
  // type Subscription {
  //     dummy: String
  // }
  // schema {
  //     query: Query
  //     mutation: Mutation
  //     subscription: Subscription
  // }
   
  
  // type Playlist {
  //   id: ID!
  //   title: String!
  //   songs: [Song]!
  //   favorite: Boolean!
  // }
  
  // input UpdatedPlaylist {
  //   id: ID!
  //   title: String
  //   songs: [ID!]
  //   favorite: Boolean
  // }
  
  // input NewPlaylist {
  //   title: String
  //   songs: [ID!]
  //   favorite: Boolean
  // }
  
  // extend type Query {
  //   Playlist(id: ID!): Playlist!
  //   allPlaylists: [Playlist]!
  // }
  
  // extend type Mutation {
  //   newPlaylist(input: NewPlaylist!): Playlist!
  //   updatePlaylist(input: UpdatedPlaylist!): Playlist!
  // }
  // `)
  //   );
  //   console.log('schemaValidationErrors=========', schemaValidationErrors);
  //   if (schemaValidationErrors.length > 0) {
  //   }

    return {
        typeDefs,
        resolvers,
    };
})();
