FROM node:14-alpine
#声明作者
MAINTAINER robin
#对外暴露的端口
EXPOSE 3003
RUN mkdir server
# 复制package.json文件
COPY  package.json  /server
WORKDIR /server
# 删除 node_modules 所有文件
# RUN echo 'dist , node_modules目录下所有文件，以及清理缓存'
RUN rm -rf ./node_modules & rm -rf  ./dist & rm -rf package-lock.json & rm -rf yarn.lock & npm cache clean --force & npm install --production 
# RUN rm -rf  ./dist
# RUN rm -rf package-lock.json
# RUN rm -rf yarn.lock
# RUN npm cache clean --force
# RUN echo '成功清理，删除依赖包'
# 安装依赖
# RUN npm install --production 

#移动当前目录下面的文件到server目录下
COPY  .  /server
# RUN echo '复制成功'
#进入到server目录下面，类似cd
WORKDIR /server
# RUN echo 'webpack打包编译生产代码'
RUN npm run build:prd
# RUN echo '编译成功'
#程序启动脚本
CMD ["npm", "prd:n"]