insert ignore into  t_permission (id,name,auth_key,description )  VALUES(1,'后台管理系统','admin','后台管理系统权限');
insert ignore into  t_permission (id,name,auth_key,description,parent_auth_key)  VALUES(2,'系统设置','admin.system','系统设置权限','admin');
insert ignore into  t_permission (id,name,auth_key,description,parent_auth_key)  VALUES(3,'账号权限','admin.system.accountAuth','账号权限','admin.system');
insert ignore into  t_permission (id,name,auth_key,description,parent_auth_key)  VALUES(4,'账号管理','admin.system.accountAuth.accountManagement','账号管理权限','admin.system.accountAuth');
insert ignore into  t_permission (id,name,auth_key,description,parent_auth_key)  VALUES(5,'角色管理','admin.system.accountAuth.roleManagement','角色管理权限','admin.system.accountAuth');


