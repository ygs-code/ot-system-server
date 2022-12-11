import userController from "@/bizMod/set/bizMod/user/controller";

export const createUser = async (root, parameter, source, fieldASTs) => {
  const { ctx, next } = root;
  const { request, response } = ctx;
  const { id } = parameter || {};

  // 新增用户
  const data = await userController.create(ctx, next, parameter);
  console.log("data=============", data);

  return {
    code: 200,
    message: "用户创建成功",
    ...data
  };
};
