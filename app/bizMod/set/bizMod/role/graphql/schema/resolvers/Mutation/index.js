import Controller from "@/bizMod/set/bizMod/role/controller";

export const createRole = async (root, parameter) => {
  const { ctx, next } = root;

  // 新增
  const data = await Controller.create(ctx, next, parameter);

  return {
    code: 200,
    message: "操作成功",
    ...data
  };
};

// 编辑
export const editRole = async (root, parameter) => {
  const { ctx, next } = root;
  const data = await Controller.edit(ctx, next, parameter);

  return {
    code: 200,
    message: "操作成功",
    ...data
  };
};

// 删除
export const removeRole = async (root, parameter) => {
  const { ctx, next } = root;

  return await Controller.remove(ctx, next, parameter);
};
