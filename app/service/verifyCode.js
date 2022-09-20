import svgCaptcha from "svg-captcha";
import { setVerifyCode, getVerifyCode } from "@/redis";
import { captureClassError } from "utils";

@captureClassError()
class Service {
  static async getVerifyCode(ctx, next, parameter = {}) {
    const { username: name, phone, password } = parameter;
    const { request, response, cookies } = ctx;
    var codeConfig = {
      size: 5, // 验证码长度
      ignoreChars: "0o1i", // 验证码字符中排除 0o1i
      noise: 3, // 干扰线条的数量
      height: 35,
      width: 110,
      fontSize: 40,
      color: false, //字符将有不同的颜色而不是灰色，如果设置了背景选项为True
      background: `#99CCCC`, //SVG图像的背景颜色
    };
    var captcha = svgCaptcha.create(codeConfig);
    const { data: imageSvg, text } = captcha;
    setVerifyCode(text, text);
    console.log("verifyCode=", text);

    //登录成功
    return {
      svg: imageSvg,
    };
  }
}

export default Service;
