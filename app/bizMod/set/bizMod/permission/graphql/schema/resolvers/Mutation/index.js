import Controller from "@/bizMod/set/bizMod/permission/controller";
// 新增
export const createPermission = async (root, parameter) => {
  const { ctx, next } = root;

  const data = await Controller.create(ctx, next, parameter);

  return {
    code: 200,
    message: "角色创建成功",
    ...data
  };
};

//  编辑
export const editPermission = async (root, parameter) => {
  const { ctx, next } = root;

  const data = await Controller.edit(ctx, next, parameter);

  return {
    code: 200,
    message: "角色创建成功",
    ...data
  };
};
