ot-system-server
├── Dockerfile
├── README.md
├── app
│   ├── __test__
│   │   ├── add.js
│   │   └── add.test.js
│   ├── bizMod
│   │   ├── index.js
│   │   ├── otDocument
│   │   │   ├── bizMod
│   │   │   │   └── document
│   │   │   │       ├── controller
│   │   │   │       │   ├── index.js
│   │   │   │       │   ├── sharedb-server.js
│   │   │   │       │   ├── throttlingStabilization.js
│   │   │   │       │   └── wss-sharedb.js
│   │   │   │       ├── graphql
│   │   │   │       │   └── schema
│   │   │   │       │       ├── index.js
│   │   │   │       │       ├── resolvers
│   │   │   │       │       │   ├── Mutation
│   │   │   │       │       │   │   └── index.js
│   │   │   │       │       │   ├── Query
│   │   │   │       │       │   │   └── index.js
│   │   │   │       │       │   ├── Subscription
│   │   │   │       │       │   │   └── index.js
│   │   │   │       │       │   ├── Union
│   │   │   │       │       │   │   └── index.js
│   │   │   │       │       │   └── index.js
│   │   │   │       │       └── typeDefs
│   │   │   │       │           ├── index.js
│   │   │   │       │           └── typeDefs.graphql
│   │   │   │       ├── index.js
│   │   │   │       ├── router
│   │   │   │       │   └── index.js
│   │   │   │       ├── service
│   │   │   │       │   └── index.js
│   │   │   │       └── sockets
│   │   │   │           ├── index.js
│   │   │   │           ├── sharedb-server.js
│   │   │   │           └── wss-sharedb.js
│   │   │   ├── config
│   │   │   │   ├── constant.js
│   │   │   │   └── index.js
│   │   │   ├── constant
│   │   │   │   └── index.js
│   │   │   ├── db
│   │   │   │   ├── document.js
│   │   │   │   ├── index.js
│   │   │   │   ├── permission.js
│   │   │   │   ├── role.js
│   │   │   │   ├── rolePermission.js
│   │   │   │   ├── sql
│   │   │   │   │   ├── initTable.sql
│   │   │   │   │   └── initTableData.sql
│   │   │   │   ├── user.js
│   │   │   │   └── userRole.js
│   │   │   ├── graphql
│   │   │   │   └── schema
│   │   │   │       └── index.js
│   │   │   ├── index.js
│   │   │   ├── redis
│   │   │   │   ├── document.js
│   │   │   │   ├── index.js
│   │   │   │   └── user.js
│   │   │   ├── router
│   │   │   │   └── index.js
│   │   │   └── utils
│   │   │       ├── common.js
│   │   │       └── index.js
│   │   └── set
│   │       ├── bizMod
│   │       │   ├── permission
│   │       │   │   ├── controller
│   │       │   │   │   └── index.js
│   │       │   │   ├── graphql
│   │       │   │   │   └── schema
│   │       │   │   │       ├── index.js
│   │       │   │   │       ├── resolvers
│   │       │   │   │       │   ├── Mutation
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   ├── Query
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   ├── Subscription
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   ├── Union
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   └── index.js
│   │       │   │   │       └── typeDefs
│   │       │   │   │           ├── index.js
│   │       │   │   │           └── typeDefs.graphql
│   │       │   │   ├── index.js
│   │       │   │   ├── router
│   │       │   │   │   └── index.js
│   │       │   │   └── service
│   │       │   │       └── index.js
│   │       │   ├── role
│   │       │   │   ├── controller
│   │       │   │   │   └── index.js
│   │       │   │   ├── graphql
│   │       │   │   │   └── schema
│   │       │   │   │       ├── index.js
│   │       │   │   │       ├── resolvers
│   │       │   │   │       │   ├── Mutation
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   ├── Query
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   ├── Subscription
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   ├── Union
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   └── index.js
│   │       │   │   │       └── typeDefs
│   │       │   │   │           ├── index.js
│   │       │   │   │           └── typeDefs.graphql
│   │       │   │   ├── index.js
│   │       │   │   ├── router
│   │       │   │   │   └── index.js
│   │       │   │   └── service
│   │       │   │       └── index.js
│   │       │   ├── rolePermission
│   │       │   │   ├── controller
│   │       │   │   │   └── index.js
│   │       │   │   ├── graphql
│   │       │   │   │   └── schema
│   │       │   │   │       ├── index.js
│   │       │   │   │       ├── resolvers
│   │       │   │   │       │   ├── Mutation
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   ├── Query
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   ├── Subscription
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   ├── Union
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   └── index.js
│   │       │   │   │       └── typeDefs
│   │       │   │   │           ├── index.js
│   │       │   │   │           └── typeDefs.graphql
│   │       │   │   ├── index.js
│   │       │   │   ├── router
│   │       │   │   │   └── index.js
│   │       │   │   └── service
│   │       │   │       └── index.js
│   │       │   ├── user
│   │       │   │   ├── controller
│   │       │   │   │   └── index.js
│   │       │   │   ├── graphql
│   │       │   │   │   └── schema
│   │       │   │   │       ├── index.js
│   │       │   │   │       ├── resolvers
│   │       │   │   │       │   ├── Mutation
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   ├── Query
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   ├── Subscription
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   ├── Union
│   │       │   │   │       │   │   └── index.js
│   │       │   │   │       │   └── index.js
│   │       │   │   │       └── typeDefs
│   │       │   │   │           ├── index.js
│   │       │   │   │           └── typeDefs.graphql
│   │       │   │   ├── index.js
│   │       │   │   ├── router
│   │       │   │   │   └── index.js
│   │       │   │   └── service
│   │       │   │       └── index.js
│   │       │   └── userRole
│   │       │       ├── controller
│   │       │       │   └── index.js
│   │       │       ├── graphql
│   │       │       │   └── schema
│   │       │       │       ├── index.js
│   │       │       │       ├── resolvers
│   │       │       │       │   ├── Mutation
│   │       │       │       │   │   └── index.js
│   │       │       │       │   ├── Query
│   │       │       │       │   │   └── index.js
│   │       │       │       │   ├── Subscription
│   │       │       │       │   │   └── index.js
│   │       │       │       │   ├── Union
│   │       │       │       │   │   └── index.js
│   │       │       │       │   └── index.js
│   │       │       │       └── typeDefs
│   │       │       │           ├── index.js
│   │       │       │           └── typeDefs.graphql
│   │       │       ├── index.js
│   │       │       ├── router
│   │       │       │   └── index.js
│   │       │       └── service
│   │       │           └── index.js
│   │       ├── config
│   │       │   ├── constant.js
│   │       │   └── index.js
│   │       ├── constant
│   │       │   └── index.js
│   │       ├── db
│   │       │   ├── index.js
│   │       │   ├── permission.js
│   │       │   ├── role.js
│   │       │   ├── rolePermission.js
│   │       │   ├── sql
│   │       │   │   ├── initTable.sql
│   │       │   │   └── initTableData.sql
│   │       │   ├── user.js
│   │       │   └── userRole.js
│   │       ├── graphql
│   │       │   └── schema
│   │       │       └── index.js
│   │       ├── index.js
│   │       ├── redis
│   │       │   ├── index.js
│   │       │   └── user.js
│   │       ├── router
│   │       │   └── index.js
│   │       └── utils
│   │           ├── common.js
│   │           └── index.js
│   ├── config
│   │   ├── constant.js
│   │   ├── db.js
│   │   ├── index.js
│   │   ├── redis.js
│   │   └── token.js
│   ├── constant
│   │   ├── httpCode.js
│   │   └── index.js
│   ├── controller
│   │   ├── home.js
│   │   ├── index.js
│   │   ├── user.js
│   │   └── verifyCode.js
│   ├── db
│   │   ├── index.js
│   │   ├── mysql.js
│   │   ├── sql
│   │   │   └── initTable.sql
│   │   └── utils.js
│   ├── graphql
│   │   ├── graphql-modules-validate
│   │   │   ├── README.md
│   │   │   ├── cjs
│   │   │   │   ├── ValidateGraphql.js
│   │   │   │   ├── ValidateGraphql.js.LICENSE.txt
│   │   │   │   └── ValidateGraphql.js.map
│   │   │   ├── esm
│   │   │   │   └── ValidateGraphql.js
│   │   │   ├── graphqlModules
│   │   │   │   ├── marketing
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── module.js
│   │   │   │   └── user
│   │   │   │       ├── index.js
│   │   │   │       └── module.js
│   │   │   ├── language.js
│   │   │   ├── package.json
│   │   │   ├── test
│   │   │   │   ├── demo.test.js
│   │   │   │   └── modules.test.js
│   │   │   ├── tsconfig.json
│   │   │   └── webpack.config.js
│   │   ├── index.js
│   │   └── schema
│   │       ├── common
│   │       │   ├── index.js
│   │       │   ├── resolvers
│   │       │   │   ├── Mutation
│   │       │   │   │   └── index.js
│   │       │   │   ├── Query
│   │       │   │   │   └── index.js
│   │       │   │   ├── Subscription
│   │       │   │   │   └── index.js
│   │       │   │   └── index.js
│   │       │   └── typeDefs
│   │       │       ├── index.js
│   │       │       └── typeDefs.graphql
│   │       ├── index.js
│   │       └── user
│   │           ├── index.js
│   │           ├── resolvers
│   │           │   ├── Mutation
│   │           │   │   └── index.js
│   │           │   ├── Query
│   │           │   │   └── index.js
│   │           │   ├── Subscription
│   │           │   │   └── index.js
│   │           │   └── index.js
│   │           └── typeDefs
│   │               ├── index.js
│   │               └── typeDefs.graphql
│   ├── index.js
│   ├── middleware
│   │   ├── common.js
│   │   ├── common.min.js
│   │   └── index.js
│   ├── modules
│   │   └── otServe
│   │       └── lib
│   │           ├── client
│   │           │   └── index.js
│   │           ├── db
│   │           │   └── index.js
│   │           └── server
│   │               └── index.js
│   ├── redis
│   │   ├── index.js
│   │   ├── jsonwebtoken
│   │   │   └── index.js
│   │   ├── jwt.js
│   │   └── redis.js
│   ├── routes
│   │   ├── index.js
│   │   └── noVerifyToken.js
│   ├── service
│   │   └── index.js
│   ├── utils
│   │   ├── CheckDataType.js
│   │   ├── common.js
│   │   ├── index.js
│   │   └── throttlingStabilization.js
│   └── view
│       ├── graphql.jsx
│       └── renderGraphiQL.js
├── dist
│   ├── index.js
│   ├── index.js.map
│   ├── runtime~index.js
│   └── runtime~index.js.map
├── jest.config.ts
├── nodemon.json
├── package.json
├── scripts
│   ├── test.js
│   └── webpack
│       ├── config
│       │   ├── bannerPlugin.js
│       │   ├── defineLoader
│       │   │   └── MyExampleWebpackLoader.js
│       │   ├── definePlugin
│       │   │   └── MyExampleWebpackPlugin.js
│       │   ├── index.js
│       │   ├── webpack.base.config.js
│       │   ├── webpack.dev.config.js
│       │   ├── webpack.dll.config.js
│       │   ├── webpack.prd.config.js
│       │   └── webpack.test.config.js
│       ├── index.js
│       ├── server.js
│       └── utils.js
├── sql
│   └── admin.sql
├── tree.md
├── tsconfig-for-webpack-config.json
├── tsconfig.json
└── yarn.lock
