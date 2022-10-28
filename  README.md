## 用户、角色、权限表的关系(mysql)

# 一，各个表格

## 1、用户表

CREATE TABLE `t_user` (

  `id` varchar(40) NOT NULL,

  `username` varchar(20) NOT NULL,

  PRIMARY KEY (`id`)

)

## 2、角色表

CREATE TABLE `t_role` (

  `id` int(11) NOT NULL AUTO_INCREMENT,

  `name` varchar(20) NOT NULL,

  `description` varchar(255) DEFAULT NULL,

  PRIMARY KEY (`id`)

)

## 3、权限表

CREATE TABLE `t_permission` (

  `id` int(11) NOT NULL AUTO_INCREMENT,

  `name` varchar(20) NOT NULL,

  `description` varchar(255) DEFAULT NULL,

  PRIMARY KEY (`id`)

)

## 4、用户角色关系表

CREATE TABLE `user_role` (

  `id` int(11) NOT NULL AUTO_INCREMENT,

  `user_id` varchar(40) NOT NULL,

  `role_id` int(11) NOT NULL,

  PRIMARY KEY (`id`),

  KEY `fk_user_role_t_role_1` (`role_id`),

  KEY `fk_user_role_t_user_1` (`user_id`),

  CONSTRAINT `fk_user_role_t_role_1` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT `fk_user_role_t_user_1` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

)

## 5、角色权限关系表

 

CREATE TABLE `role_permission` (

  `id` int(11) NOT NULL AUTO_INCREMENT,

  `role_id` int(11) NOT NULL,

  `permission_id` int(11) NOT NULL,

  PRIMARY KEY (`id`),

  KEY `fk_role_permission_t_permission_1` (`permission_id`),

  KEY `fk_role_permission_t_role_1` (`role_id`),

  CONSTRAINT `fk_role_permission_t_permission_1` FOREIGN KEY (`permission_id`) REFERENCES `t_permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT `fk_role_permission_t_role_1` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

)

![img](https://www.pianshen.com/images/245/3bf0a85316d6a6cb979b90accbf7fee5.png)

 

## 6、测试数据

INSERT INTO `t_role` VALUES ('1','读者',NULL), ('2','作者',NULL), ('3','管理员',NULL);

INSERT INTO `t_user` VALUES ('u1','reader'), ('u11','reader1'), ('u2','author'), ('u22','author2'), ('u3','admin'), ('u33','admin2');

INSERT INTO `t_permission` VALUES ('1','小说收藏',NULL), ('2','小说发布',NULL), ('3','广告发布',NULL);

INSERT INTO `role_permission` VALUES ('1','1','1'), ('2','2','2'), ('3','3','3');

INSERT INTO `user_role` VALUES ('1','u1','1'), ('2','u2','2'), ('3','u3','3'), ('4','u11','1'), ('5','u22','2'), ('6','u33','3');

小说网站，用户表的设计。

用户有着“读者”，“作者”和“管理员”角色，角色有不同权限，如小说收藏，小说发布和广告发布

假定，用户和角色是一对一关系，即一个用户只有一个角色；角色和用户的关系是一对多关系，一个角色对应着多个用户。(方便后面对应英文单词直观反应着关系，如看到reader就是表示读者角色)

角色和权限的关系是多对多关系。即一个角色有着多种权限，同样，一个权限可以分给不同角色。

# 二、多对多查询

## 1、查询拥有某角色的用户信息

 

SELECT

u.id,u.username

FROM

   t_user u,t_role r,user_role ur

WHERE

   r.id=1 AND  r.id=ur.role_id AND ur.user_id=u.id;

 ![img](https://www.pianshen.com/images/279/75947025d5160c206cb4c0cba67b1d87.png)

 

 

## 2、查询某用户的对应的角色。

 

SELECT

u.id,u.username,r.`name` role_name

FROM

   t_user u,t_role r,user_role ur

WHERE

  u.username LIKE 'a%' AND u.id=ur.user_id AND ur.role_id=r.id;

 ![img](https://www.pianshen.com/images/953/3ccbc1a29f2a6fb00494e97775f53689.png)

 

 

 

## 3、查询拥有某权限的角色

SELECT p.`name`,r.`name`

FROM

t_permission p,role_permission rp,t_role r

WHERE

p.`name`='小说发布' AND p.id=rp.permission_id AND rp.role_id=r.id;

 

 ![img](https://www.pianshen.com/images/674/a270640287eb6f4e5b2c794be603d5a2.png)

 

 

## 4、查询某角色拥有的权限。

SELECT r.`name`,p.`name`

FROM

t_permission p,role_permission rp,t_role r

WHERE

r.`name`='作者' AND r.id=rp.role_id AND rp.permission_id=p.id;

 ![img](https://www.pianshen.com/images/87/e8b2d16812d268aad53d397d122aabd7.png)

 

 

 

## 5、查询某用户拥有的权限。

这里用户和角色是一对一关系，通过先查询用户的角色，再查询权限。（单行单例子查询）

SELECT p.`name`

FROM

t_permission p,role_permission rp,t_role r

WHERE

r.id=rp.role_id AND rp.permission_id=p.id AND  r.id

IN

(SELECT r.id

FROM

   t_user u,t_role r,user_role ur

WHERE

  u.username ='author' AND u.id=ur.user_id AND ur.role_id=r.id);

 

 ![img](https://www.pianshen.com/images/227/b164570558fdbfa86137de0713c593b3.png)

 

## 6.查询拥有某权限的用户

权限与角色是多对多关系，角色和用户是一对一关系。

这个是查询是多行单列子查询

SELECT

u.id,u.username

FROM

   t_user u,t_role r,user_role ur

WHERE

  r.id=ur.role_id AND ur.user_id=u.id AND r.id

IN

(SELECT r.id

FROM

t_permission p,role_permission rp,t_role r

WHERE

p.`name`='小说发布' AND p.id=rp.permission_id AND rp.role_id=r.id);

 ![img](https://www.pianshen.com/images/164/7d3a2fd6ccf519ac9404bad7edf5a5a4.png)