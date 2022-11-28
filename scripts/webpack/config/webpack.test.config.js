import path from "path";
import fs from "fs";
//glob 获取目录下面所有文件
import glob from "glob";
export default {
  entry: {
    ...((globalPath) => {
      let testJsFiles = {},
        pageName;

      glob.sync(globalPath).forEach((testJsPath) => {
        var basename = path.basename(testJsPath, path.extname(testJsPath));
        // console.log("match=", testJsPath.match(/\.js$/g));
        pageName = testJsPath.replace(/\.js$/g, "");

        pageName = pageName.split("/app/")[1];

        testJsFiles[pageName] = testJsPath;
      });

      return testJsFiles;
    })(path.resolve(process.cwd(), "./app/**/*.test.js")),
  },
};
