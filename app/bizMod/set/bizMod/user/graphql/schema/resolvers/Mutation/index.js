import Controller from "@/bizMod/set/bizMod/user/controller";
// 新增
export const createUser = async (root, parameter) => {
  const { ctx, next } = root;

  const data = await Controller.create(ctx, next, parameter);

  return {
    code: 200,
    message: "操作成功",
    ...data
  };
};

// 编辑
export const editUser = async (root, parameter) => {
  const { ctx, next } = root;

  const data = await Controller.edit(ctx, next, parameter);

  return {
    code: 200,
    message: "操作成功",
    ...data
  };
};
