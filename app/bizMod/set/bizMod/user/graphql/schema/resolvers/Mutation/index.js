import userController from "@/bizMod/set/bizMod/user/controller";
export const createUser = async (root, parameter, source, fieldASTs) => {
  const { ctx, next } = root;
  const { request, response } = ctx;
  const { id } = parameter || {};

  const data = await userController.register(ctx, next, parameter);
  console.log("data=============", data);

  return {
    code: 200,
    message: "用户创建成功",
    ...data
  };
};
