import Controller from "@/bizMod/set/bizMod/rolePermission/controller";

// 编辑角色
export const editRolePermission = async (root, parameter) => {
  const { ctx, next } = root;

  // 新增角色
  const data = await Controller.edit(ctx, next, parameter);

  return {
    code: 200,
    message: "角色创建成功",
    ...data
  };
};
