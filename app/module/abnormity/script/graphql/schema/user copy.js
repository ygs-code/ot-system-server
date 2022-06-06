import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
} from 'graphql/type';

import co from 'co';
/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
function getProjection(fieldASTs) {
    return fieldASTs.selectionSet.selections.reduce(
        (projections, selection) => {
            projections[selection.name.value] = 1;

            return projections;
        },
        {}
    );
}

var userType = new GraphQLObjectType({
    name: 'User',
    description: 'User creator',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The id of the user.',
            // resolve: (user, params, source, fieldASTs) => {

            // //   var projections = getProjection(fieldASTs);
            // //   return User.find({
            // //     _id: {
            // //       // to make it easily testable
            // //       $in: user.friends.map((id) => id.toString())
            // //     }
            // //   }, projections);
            // },
        },
        name: {
            type: GraphQLString,
            description: 'The name of the user.',
        },
        friends: {
            type: new GraphQLList(userType),
            description:
                'The friends of the user, or an empty list if they have none.',
            // resolve: (user, params, source, fieldASTs) => {
            //     console.log('User====')
            // //   var projections = getProjection(fieldASTs);
            // //   return User.find({
            // //     _id: {
            // //       // to make it easily testable
            // //       $in: user.friends.map((id) => id.toString())
            // //     }
            // //   }, projections);
            // },
        },
    }),
});

// var schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve: function() {
//           return 'world';
//         }
//       },
//       user: {
//         type: userType,
//         args: {
//           id: {
//             name: 'id',
//             type: new GraphQLNonNull(GraphQLString)
//           }
//         },
//         resolve: (root, {id}, source, fieldASTs) => {
//           var projections = getProjection(fieldASTs);
//           return User.findById(id, projections);
//         }
//       }
//     }
//   }),

//   // mutation
//   mutation: new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//       createUser: {
//         type: userType,
//         args: {
//           name: {
//             name: 'name',
//             type: GraphQLString
//           }
//         },
//         resolve: (obj, {name}, source, fieldASTs) => co(function *() {
//           var projections = getProjection(fieldASTs);

//           var user = new User();
//           user.name = name;

//           return yield user.save();
//         })
//       },
//       removeUser: {
//         type: userType,
//         args: {
//           id: {
//             name: 'id',
//             type: new GraphQLNonNull(GraphQLString)
//           }
//         },
//         resolve: (obj, {id}, source, fieldASTs) => co(function *() {
//           var projections = getProjection(fieldASTs);
//           console.log(id);
//           return yield User.findOneAndRemove({_id: id});
//         })
//       },
//       updateUser: {
//         type: userType,
//         args: {
//           id: {
//             name: 'id',
//             type: new GraphQLNonNull(GraphQLString)
//           },
//           name: {
//             name: 'name',
//             type: GraphQLString
//           }
//         },
//         resolve: (obj, {id, name}, source, fieldASTs) => co(function *() {
//           var projections = getProjection(fieldASTs);

//           yield User.update({
//             _id: id
//           }, {
//             $set: {
//               name: name
//             }
//           });

//           return yield User.findById(id, projections);
//         })
//       }
//     }
//   })
// });
// const   createUser = {
//     type: userType,
//     args: {
//       name: {
//         name: 'name',
//         type: GraphQLString
//       }
//     },
//     resolve: (root, data, source, fieldASTs) => co(function *() {
//       console.log('root=',root)
//       console.log('data=',data)
//     })
//   };

const createUser = {
    type: userType,
    args: {
        name: {
            name: 'name',
            type: GraphQLString,
        },
    },
    resolve: (root, data, source, fieldASTs) => {
        // console.log('root======',root)
        // console.log('data======',data)
        // return yield user.save();
        return {
            name: '创建用户',
        };
    },
    // resolve: (root, data, source, fieldASTs) =>
    //     co(function* () {
    //         // console.log('root======',root)
    //         // console.log('data======',data)
    //         // return yield user.save();
    //         return {
    //             name: '创建用户',
    //         };
    //     }),
};

const user = {
    type: userType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve: (root, data, source, fieldASTs) => {
        const { id } = data;

        // console.log('root=',root)
        // console.log('data=',data)
    },
};
// code
// data {
//   id
//   name
//   phone
// }
// message


var getUserInfoDataType=new GraphQLObjectType({
    name: 'getUserInfo',
    description: 'User creator',
    fields: () => ({
        phone: {
            type:GraphQLString,
            description: 'The id of the user.',
            // resolve: (user, params, source, fieldASTs) => {

            // //   var projections = getProjection(fieldASTs);
            // //   return User.find({
            // //     _id: {
            // //       // to make it easily testable
            // //       $in: user.friends.map((id) => id.toString())
            // //     }
            // //   }, projections);
            // },
        },
        name: {
            type:GraphQLString,
            description: 'The id of the user.',
            // resolve: (user, params, source, fieldASTs) => {

            // //   var projections = getProjection(fieldASTs);
            // //   return User.find({
            // //     _id: {
            // //       // to make it easily testable
            // //       $in: user.friends.map((id) => id.toString())
            // //     }
            // //   }, projections);
            // },
        },
      
        // name: {
        //     type: GraphQLString,
        //     description: 'The name of the user.',
        // },
        // friends: {
        //     type: new GraphQLList(userType),
        //     description:
        //         'The friends of the user, or an empty list if they have none.',
        //     // resolve: (user, params, source, fieldASTs) => {
        //     //     console.log('User====')
        //     // //   var projections = getProjection(fieldASTs);
        //     // //   return User.find({
        //     // //     _id: {
        //     // //       // to make it easily testable
        //     // //       $in: user.friends.map((id) => id.toString())
        //     // //     }
        //     // //   }, projections);
        //     // },
        // },
    }),
});

 
// 描述返回的数据类型
var getUserInfoType = new GraphQLObjectType({
    name: 'getUserInfo',
    description: 'User creator',
    fields: () => ({
        code: {
            type:GraphQLString,
            description: 'The id of the user.',
            // resolve: (user, params, source, fieldASTs) => {

            // //   var projections = getProjection(fieldASTs);
            // //   return User.find({
            // //     _id: {
            // //       // to make it easily testable
            // //       $in: user.friends.map((id) => id.toString())
            // //     }
            // //   }, projections);
            // },
        },
        message: {
            type:GraphQLString,
            description: 'The id of the user.',
            // resolve: (user, params, source, fieldASTs) => {

            // //   var projections = getProjection(fieldASTs);
            // //   return User.find({
            // //     _id: {
            // //       // to make it easily testable
            // //       $in: user.friends.map((id) => id.toString())
            // //     }
            // //   }, projections);
            // },
        },
        data:{
            type: getUserInfoDataType ,
            description: 'The id of the user.',  
        }
        // name: {
        //     type: GraphQLString,
        //     description: 'The name of the user.',
        // },
        // friends: {
        //     type: new GraphQLList(userType),
        //     description:
        //         'The friends of the user, or an empty list if they have none.',
        //     // resolve: (user, params, source, fieldASTs) => {
        //     //     console.log('User====')
        //     // //   var projections = getProjection(fieldASTs);
        //     // //   return User.find({
        //     // //     _id: {
        //     // //       // to make it easily testable
        //     // //       $in: user.friends.map((id) => id.toString())
        //     // //     }
        //     // //   }, projections);
        //     // },
        // },
    }),
});


// 不需要任何參數
const getUserInfo = {
    type: getUserInfoType,
    // args: {
    //   code:{
    //     name: 'id',
    //     type: new GraphQLNonNull(GraphQLInt)
    //   },
    //   id: {
    //     name: 'id',
    //     type: new GraphQLNonNull(GraphQLInt)
    //   }
    // },
    resolve: (root, data, source, fieldASTs) => {
        // const {id}=data

        console.log('getUserInfo=======================', root);
 
        return {
            code:'200',
            message:'查询成功',
            data  :{
              name:'姚观寿',
              phone:"18529531779"
            }
        };
    },
};

const hello = {
    type: GraphQLString,
    resolve: function () {
        return 'world';
    },
};

export default {
    mutation: {
        createUser,
    },
    query: {
        user,
        getUserInfo,
        hello,
    },
};
