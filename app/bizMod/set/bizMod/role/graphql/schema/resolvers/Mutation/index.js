import Controller from "@/bizMod/set/bizMod/role/controller";

export const createRole = async (root, parameter, source, fieldASTs) => {
  const { ctx, next } = root;
  const { request, response } = ctx;
  const { id } = parameter || {};

  // 新增角色
  const data = await Controller.create(ctx, next, parameter);

  return {
    code: 200,
    message: "角色创建成功",
    ...data
  };
};

// 编辑角色
export const editRole = async (root, parameter, source, fieldASTs) => {
  const { ctx, next } = root;
  const { request, response } = ctx;
  const { id } = parameter || {};

  // 新增角色
  const data = await Controller.edit(ctx, next, parameter);

  return {
    code: 200,
    message: "角色创建成功",
    ...data
  };
};
