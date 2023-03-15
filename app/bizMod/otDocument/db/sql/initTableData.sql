#插入root用户
insert
    ignore into user (
        id,
        name,
        email,
        password,
        phone,
        type
    )
VALUES (
        1,
        'root',
        '123456@qq.com',
        '0DVd6jFuZ8ZglujHBHrlEBbopvFJUjiQWRrYhTUeZ5M',
        '13111111111',
        1
    );

#插入超级管理员角色
insert
    ignore into role (id, name, description)
VALUES (1, '超级管理员', '这个是超级管理员用户拥有所有权限');

#为root 用户 添加超级管理员角色  user_role
INSERT
    ignore INTO user_role (id, user_id, role_id)
VALUES(1, 1, 1);

insert
    ignore into permission (id, name, auth_key, description)
VALUES (
        1,
        '后台管理系统',
        'admin',
        '后台管理系统权限'
    );

#  role_permission 为root 角色添加管理权限key  
insert
    ignore into role_permission (id, role_id, permission_id)
VALUES (1, 1, 1);

insert
    ignore into permission (
        id,
        name,
        auth_key,
        description,
        parent_id
    )
VALUES (
        2,
        '系统设置',
        'admin.system',
        '系统设置权限',
        1
    );

#  role_permission 为 root 角色添加管理权限key 
insert
    ignore into role_permission (id, role_id, permission_id)
VALUES (2, 1, 2);

insert
    ignore into permission (
        id,
        name,
        auth_key,
        description,
        parent_id
    )
VALUES (
        3,
        '账号权限',
        'admin.system.accountAuth',
        '账号权限',
        2
    );

#  role_permission 为 root 角色添加管理权限key 
insert
    ignore into role_permission (id, role_id, permission_id)
VALUES (3, 1, 3);

insert
    ignore into permission (
        id,
        name,
        auth_key,
        description,
        parent_id
    )
VALUES (
        4,
        '账号管理',
        'admin.system.accountAuth.accountManagement',
        '账号管理权限',
        3
    );

#  role_permission 为 root 角色添加管理权限key 
insert
    ignore into role_permission (id, role_id, permission_id)
VALUES (4, 1, 4);

insert
    ignore into permission (
        id,
        name,
        auth_key,
        description,
        parent_id
    )
VALUES (
        5,
        '角色管理',
        'admin.system.accountAuth.roleManagement',
        '角色管理权限',
        4
    );

#  role_permission 为 root 角色添加管理权限key 
insert
    ignore into role_permission (id, role_id, permission_id)
VALUES (5, 1, 5);