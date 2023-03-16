import Controller from "@/bizMod/set/bizMod/permission/controller";
// 新增
export const createDocument = async (root, parameter) => {
  const { ctx, next } = root;

  const data = await Controller.create(ctx, next, parameter);

  return {
    code: 200,
    message: "角色创建成功",
    ...data
  };
};

// app\bizMod\set\bizMod\permission\graphql\schema
// app\bizMod\set\bizMod\permission\graphql\schema

//  编辑
export const editDocument = async (root, parameter) => {
  const { ctx, next } = root;

  const data = await Controller.edit(ctx, next, parameter);

  return {
    code: 200,
    message: "角色创建成功",
    ...data
  };
};

//  编辑
export const removeDocument = async (root, parameter) => {
  const { ctx, next } = root;

  return await Controller.remove(ctx, next, parameter);
};
