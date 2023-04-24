FROM node:14-alpine
#声明作者
MAINTAINER robin
#对外暴露的端口
# EXPOSE 3003
RUN mkdir ot-system-server
# 复制package.json文件
COPY  package.json  /ot-system-server
WORKDIR /ot-system-server
# 删除 node_modules 所有文件
# RUN echo 'dist , node_modules目录下所有文件，以及清理缓存'
RUN echo '删除 dist , node_modules目录下所有文件 , 以及清理缓存' & rm -rf ./node_modules & rm -rf  ./dist & rm -rf package-lock.json & rm -rf yarn.lock & npm cache clean --force &
RUN echo '安装node_modules依赖包' & npm install --production 


#清理缓存
ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
#移动当前目录下面的文件到server目录下
COPY  .  /ot-system-server
# RUN echo '复制成功'
#进入到server目录下面，类似cd
WORKDIR /ot-system-server
# RUN echo 'webpack打包编译生产代码'
RUN echo '编译打包server' & npm run build:prd
RUN echo 'redis镜像build打包成功'

# RUN echo '编译成功'
#程序启动脚本
CMD ["npm", "prd:n"]