export const createUser = async (root, parameter, source, fieldASTs) => {
  console.log("createUser================");
//   const { ctx, next } = root;
//   const { request, response } = ctx;
//   const { id } = parameter || {};

  //  //添加service
  //   const data = await userService.getVerifyCode(ctx, next, parameter);

  return {
    code: 200,
    message: "用户创建成功",
  };
};
