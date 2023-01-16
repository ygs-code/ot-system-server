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

  `user_id` int(11) NOT NULL,

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

 

```
#查询拥有某角色的用户信息
SELECT
u.id,   #查询字段
u.name
FROM
   t_user u,  #用户表
	 t_role r,  #角色表
	 user_role ur #用户_角色表
WHERE
   r.id=1 AND  r.id=ur.role_id AND ur.user_id=u.id;  #查询条件
```



 ![img](https://www.pianshen.com/images/279/75947025d5160c206cb4c0cba67b1d87.png)

 

 

## 2、查询某用户的对应的角色。

 

```
	
SELECT
u.id  user_id, #重命名
u.`name` user_name , #重命名
r.`name` role_name  #重命名
FROM
   t_user u, #缩写表
	 t_role r,  #缩写表
	 user_role ur  #缩写表
WHERE
  u.name LIKE 'qq281113270' AND u.id=ur.user_id AND ur.role_id=r.id;  #查询条件
  
  
  # 或者用id查询
SELECT
u.id  user_id, #重命名
u.`name` user_name , #重命名
r.`name` role_name  #重命名
FROM
   t_user u, #缩写表
	 t_role r,  #缩写表
	 user_role ur  #缩写表
WHERE
  u.id = 3 AND u.id=ur.user_id AND ur.role_id=r.id;  #查询条件  
  
  
```



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





## 7.查询某用户拥有的权限key

```
 # 查询某用户下的权限key 用户id 为3
SELECT
u.id  user_id, #重命名
u.`name` user_name , #重命名
r.`id` role_id,  #重命名
r.`name` role_name,  #重命名
p.`id` permission_id,  #重命名
p.`name` permission_name , #重命名
p.`auth_key` permission_auth_key,  #重命名


FROM
     t_user u, #缩写表
	 t_role r,  #缩写表
	 user_role ur,  #缩写表
	 t_permission p, #缩写表
	 role_permission  rp #缩写表
WHERE
		u.id = 3 AND u.id=ur.user_id AND r.id=ur.role_id AND r.id= rp.role_id  AND p.id= rp.permission_id;  #查询条件
		
		
```





# 多表联查

#### 数据结构说明：

-- 学生表：student(学号,学生姓名,出生年月,性别)
-- 成绩表：score(学号,课程号,成绩)
-- 课程表：course(课程号,课程名称,教师号)
-- 教师表：teacher(教师号,教师姓名)

![img](https://upload-images.jianshu.io/upload_images/7856649-4e438df234c8a982.png?imageMogr2/auto-orient/strip|imageView2/2/w/724/format/webp)

#### 创建数据

```
-- 1)创建学生表(t_student)
CREATE TABLE `t_student` (
`id` int(11) NOT NULL COMMENT '学号',        
`name` varchar(50) DEFAULT NULL COMMENT '姓名',
`date_birth` date DEFAULT NULL  COMMENT '出生日期',
`sex` varchar(10) DEFAULT NULL   COMMENT '性别',
 PRIMARY KEY (`id`) COMMENT '关键key'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2)创建教师表(t_teacher)
CREATE TABLE `t_teacher` (
`id` int(11) NOT NULL COMMENT '教师号',       
`name` varchar(50) DEFAULT NULL COMMENT '教师姓名',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




-- 3)创建课程表(t_course)
CREATE TABLE `t_course` (
`id` int(11) NOT NULL COMMENT '课程号',  
`name`  int(11) NOT NULL COMMENT '课程名称',  
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- 4)学生表_课程表->成绩表   
CREATE TABLE `t_score` (
`id` int(11) NOT NULL COMMENT '成绩表id',  
`student_id` int(11) NOT NULL COMMENT '学号',  
`course_id` int(11) NOT NULL COMMENT '课程号',  
`score` float(3,0) DEFAULT NULL COMMENT '成绩',  
 PRIMARY KEY (`id`) COMMENT '主key',  
 key `fk_t_score_t_teacher` (`student_id`)  ,   
 CONSTRAINT `fk_t_score_t_teacher` FOREIGN KEY(`student_id`) REFERENCES t_student(id),   
 key `fk_t_score_t_course` (`course_id`) ,   
 CONSTRAINT `fk_t_score_t_course` FOREIGN KEY(`course_id`) REFERENCES t_course(id)   
) ENGINE=InnoDB DEFAULT CHARSET=utf8;





-- 5)课程表_教师表->授课表  
CREATE TABLE `t_teaching` (
`id` int(11) NOT NULL COMMENT '授课id',  
`teacher_id` int(11) NOT NULL COMMENT '教师id',  
`course_id` int(11) NOT NULL COMMENT '课程号',  
 PRIMARY KEY (`id`) COMMENT '主key',  
 key `fk_t_teaching_t_teacher` (`teacher_id`)  ,   
 CONSTRAINT `fk_t_teaching_t_teacher` FOREIGN KEY(`teacher_id`) REFERENCES t_teacher(id),   
 key `fk_t_teaching_t_course` (`course_id`) ,   
 CONSTRAINT `fk_t_teaching_t_course` FOREIGN KEY(`course_id`) REFERENCES t_course(id)   
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


```



# MySQL外键约束（FOREIGN KEY）

http://c.biancheng.net/view/2441.html