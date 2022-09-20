import { verifyCode as verifyCodeService } from "app/service";
import { captureClassError } from "utils";

@captureClassError()
class Controller {
  static async getVerifyCode(ctx, next) {
    // ctx.set("Content-Type", "application/json")
    var parameter = ctx.request.body; // 获取请求参数

    //添加service
    const data = await verifyCodeService.getVerifyCode(ctx, next, parameter);

    ctx.response.body = {
      code: 200,
      data,
      message: "验证码获取成功",
    };
  }
}

export default Controller;
