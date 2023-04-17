FROM node:14
#声明作者
MAINTAINER robin
#移动当前目录下面的文件到app目录下
COPY   ../../.    /app
#进入到app目录下面，类似cd
WORKDIR /app
#安装依赖
RUN npm install
RUN npm run build:prd
#对外暴露的端口
EXPOSE 3003
#程序启动脚本
CMD ["npm", "dev:n"]