# 用户表
CREATE TABLE
    IF NOT EXISTS `t_user` (
        `id` int NOT NULL AUTO_INCREMENT,
        `user_name` varchar(40) NOT NULL,
        `email` varchar(200) NOT NULL,
        `phone` varchar(11) DEFAULT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# 角色表
CREATE TABLE
    IF NOT EXISTS `t_role` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(20) NOT NULL,
        `description` varchar(255) DEFAULT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# 权限表
CREATE TABLE
    IF NOT EXISTS `t_permission` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(20) NOT NULL,
        `auth_key` varchar(255) NOT NULL,
        `description` varchar(255) DEFAULT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# 角色_权限表
CREATE TABLE
    IF NOT EXISTS `role_permission` (
        `id` int NOT NULL AUTO_INCREMENT,
        `role_id` int NOT NULL,
        `permission_id` int NOT NULL,
        PRIMARY KEY (`id`),
        KEY `fk_role_permission_t_permission_1` (`permission_id`),
        KEY `fk_role_permission_t_role_1` (`role_id`),
        CONSTRAINT `fk_role_permission_t_permission_1` FOREIGN KEY (`permission_id`) REFERENCES `t_permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `fk_role_permission_t_role_1` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;