FROM node:14-alpine
#声明作者
MAINTAINER robin

RUN  echo '设置使用淘宝镜像源' & npm config set registry https://registry.npm.taobao.org  & npm install -g cnpm --registry=https://registry.npm.taobao.org

#对外暴露的端口
RUN mkdir ot-system-server
# 复制package.json文件
COPY  package.json  /ot-system-server
WORKDIR /ot-system-server
# 删除 node_modules 所有文件
# RUN echo 'dist , node_modules目录下所有文件，以及清理缓存'
RUN echo '删除 dist , node_modules目录下所有文件 , 以及清理缓存' & rm -rf ./node_modules & rm -rf  ./dist & rm -rf package-lock.json & rm -rf yarn.lock & npm cache clean --force &
RUN echo '安装node_modules依赖包' & cnpm install --production 


ARG    REDIS_ADDRESS  # redis ip  
ARG    REDIS_PORT  # redis 端口
ARG    MYSQL_ADDRESS  # mysql ip  
ARG    MYSQL_PORT  # mysql 端口
ARG    MYSQL_ROOT_PASSWORD  # mysql 密码
ARG    SERVER_ADDRESS  # serverip 
ARG    SERVER_PORT  # server 端口
ARG    SERVER_NODE_ENV  # server NODE_ENV
ARG    CLIENT_ADDRESS  # client ip  
ARG    CLIENT_PORT  # client 端口
ARG    CLIENT_SERVER_NAME 
ARG    CLIENT_PUBLICPATH 
ARG    ADMIN_ADDRESS  # admin ip  
ARG    ADMIN_PORT  # admin 端口
ARG    ADMIN_SERVER_NAME 
ARG    ADMIN_PUBLICPATH 

ENV    REDIS_ADDRESS=${REDIS_ADDRESS}  
ENV    REDIS_PORT=${REDIS_PORT} 
ENV    MYSQL_ADDRESS=${MYSQL_ADDRESS}  
ENV    MYSQL_PORT=${MYSQL_PORT} 
ENV    MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}  
ENV    SERVER_ADDRESS=${SERVER_ADDRESS} 
ENV    SERVER_PORT=${SERVER_PORT}  
ENV    NODE_ENV=${SERVER_NODE_ENV} 
ENV    CLIENT_ADDRESS=${CLIENT_ADDRESS}  
ENV    CLIENT_PORT=${CLIENT_PORT} 
ENV    CLIENT_SERVER_NAME=${CLIENT_SERVER_NAME}
ENV    CLIENT_PUBLICPATH=${CLIENT_PUBLICPATH}
ENV    ADMIN_ADDRESS=${ADMIN_ADDRESS} 
ENV    ADMIN_PORT=${ADMIN_PORT} 
ENV    ADMIN_SERVER_NAME=${ADMIN_SERVER_NAME}
ENV    ADMIN_PUBLICPATH=${ADMIN_PUBLICPATH}

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