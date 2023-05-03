import Controller from "@/bizMod/set/bizMod/user/controller";

// 登录接口
export const login = async (root, parameter) => {
  const { ctx, next } = root;

  //    登录
  const data = await Controller.login(ctx, next, parameter);

  return data;
};

// 退出登录接口
export const logOut = async (root, parameter) => {
  const { ctx, next } = root;

  const data = await Controller.logOut(ctx, next, parameter);

  return data;
};

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

// 删除
export const removeUser = async (root, parameter) => {
  const { ctx, next } = root;

  return await Controller.remove(ctx, next, parameter);
};
