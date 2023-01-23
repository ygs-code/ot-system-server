# 用户表
CREATE TABLE
    IF NOT EXISTS `user` (
        `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
        `name` varchar(40) NOT NULL COMMENT '名称',
        `email` varchar(200) NOT NULL COMMENT '邮箱',
        `password` varchar(200) NOT NULL COMMENT '密码',
        `phone` varchar(11) NOT NULL COMMENT '手机',
        `type` varchar(11) NOT NULL COMMENT '用户类型1=管理员，2=普通用户',
        `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY (`id`) COMMENT '设置主键id'
    ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

# 角色表
CREATE TABLE
    IF NOT EXISTS `role` (
        `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
        `name` varchar(20) NOT NULL COMMENT '名称',
        `description` varchar(255) DEFAULT NULL COMMENT '描述',
        `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

# 权限表
CREATE TABLE
    IF NOT EXISTS `permission` (
        `id` int(0)  NOT NULL AUTO_INCREMENT COMMENT '主键id',
        `name` varchar(20) NOT NULL COMMENT '名称',
        `auth_key` varchar(255) NOT NULL COMMENT '权限key',
        `description` varchar(255) DEFAULT NULL COMMENT '描述',
        `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
         `parent_id` int(0) NULL DEFAULT NULL,
        PRIMARY KEY (`id`) COMMENT '设置主键id'
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;


# 用户_角色关系表
CREATE TABLE
  IF NOT EXISTS `user_role` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `user_id` int(11) NOT NULL COMMENT '用户id',
    `role_id` int(11) NOT NULL COMMENT '角色id',
    `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`) COMMENT '设置主键id',
    UNIQUE KEY uk_user_id_role_id_create (`user_id`,`role_id`) COMMENT  '设置联合组合键',
    KEY idx_user_id_role_id_create (`user_id`,`role_id`) COMMENT '设置联合组合键',
    KEY `fk_user_role_role` (`role_id`),
    KEY `fk_user_role_user` (`user_id`),
    CONSTRAINT `fk_user_role_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_user_role_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

# 角色_权限表
CREATE TABLE
    IF NOT EXISTS `role_permission` (
        `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
        `role_id` int NOT NULL COMMENT '角色id', 
        `permission_id` int NOT NULL COMMENT '权限id',
        `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY (`id`) COMMENT '设置主键id',
        UNIQUE KEY uk_role_id_permission_id_create (`role_id`,`permission_id`) COMMENT  '设置联合组合键',
        KEY idx_role_id_permission_id_create (`role_id`,`permission_id`) COMMENT '设置联合组合键',
        KEY `fk_role_permission_permission` (`permission_id`),
        KEY `fk_role_permission_role` (`role_id`),
        CONSTRAINT `fk_role_permission_permission` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `fk_role_permission_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci; 