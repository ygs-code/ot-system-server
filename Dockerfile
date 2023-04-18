FROM node:14
#声明作者
MAINTAINER robin

#移动当前目录下面的文件到app目录下
RUN echo '复制文件到镜像中'
COPY  .   /server
#进入到app目录下面，类似cd
WORKDIR /server
RUN echo '复制成功'

# 运行git记录获取到git信息
# RUN nameOnly = $(git log --name-only)

# 删除 node_modules 所有文件
# RUN echo 'dist , node_modules目录下所有文件，以及清理缓存'
# RUN rm -rf  ./node_modules
# RUN rm -rf  ./dist
# RUN rm -rf package-lock.json
# RUN rm -rf yarn.lock
# RUN npm cache clean --force
# RUN echo '删除成功'


#安装依赖
RUN echo '安装npm依赖包'
RUN yarn
RUN echo '安装成功'

RUN echo 'webpack打包编译生产代码'
RUN npm run build:prd
RUN echo '编译成功'
#对外暴露的端口
EXPOSE 3003
#程序启动脚本
RUN echo '启动server服务器'
CMD ["npm", "prd:n"]
RUN echo '启动成功'
