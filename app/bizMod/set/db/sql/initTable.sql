# 用户表
CREATE TABLE
    IF NOT EXISTS `user` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(40) NOT NULL,
        `email` varchar(200) NOT NULL,
        `password` varchar(200) NOT NULL,
        `phone` varchar(11) NOT NULL,
        `type` varchar(11) NOT NULL COMMENT '用户类型1=管理员，2=普通用户',
        `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# 角色表
CREATE TABLE
    IF NOT EXISTS `role` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(20) NOT NULL,
        `description` varchar(255) DEFAULT NULL,
        `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# 权限表
CREATE TABLE
    IF NOT EXISTS `permission` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(20) NOT NULL,
        `auth_key` varchar(255) NOT NULL,
        `parent_auth_key` varchar(255) DEFAULT NULL,
        `description` varchar(255) DEFAULT NULL,
        `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;



## 4、用户_角色关系表
CREATE TABLE
  IF NOT EXISTS `user_role` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `role_id` int(11) NOT NULL,
    `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `fk_user_role_role` (`role_id`),
    KEY `fk_user_role_user` (`user_id`),
    CONSTRAINT `fk_user_role_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_user_role_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);


# 角色_权限表
CREATE TABLE
    IF NOT EXISTS `role_permission` (
        `id` int NOT NULL AUTO_INCREMENT,
        `role_id` int NOT NULL,
        `permission_id` int NOT NULL,
        `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY (`id`),
        KEY `fk_role_permission_permission` (`permission_id`),
        KEY `fk_role_permission_role` (`role_id`),
        CONSTRAINT `fk_role_permission_permission` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `fk_role_permission_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;