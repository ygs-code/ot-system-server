import { verifyCode as verifyCodeService } from "@/service";


export const getVerifyCode = async (root, parameter, source, fieldASTs) => {
  const { ctx, next } = root;
  const { request, response } = ctx;
  const { id } = parameter || {};

  //  //添加service
  const data = await verifyCodeService.getVerifyCode(ctx, next, parameter);

  return {
    code: 200,
    data,
    message: "验证码获取成功",
  };
};
