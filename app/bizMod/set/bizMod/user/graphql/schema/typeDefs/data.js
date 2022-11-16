let data = {
  token:
    "06o1Gab3BIu4O7iHa96y7dWH20oGNqWrbOivLl8Ef3YQ-MsKcorsylPlC4tlF9735V18oGpDFpdBBll5ZSEWbA",
  userInfo: {
    id: 1,
    name: "root",
    email: "123456@qq.com",
    phone: "13111111111",
    create_time: "2022-11-16T02:17:11.000Z",
    update_time: "2022-11-16T02:17:11.000Z",
  },
  
  permissionData: [
    {
      id: 1,
      name: "后台管理系统",
      description: "后台管理系统权限",
      authKey: "admin",
      parentAuthKey: null,
    },
    {
      id: 2,
      name: "系统设置",
      description: "系统设置权限",
      authKey: "admin.system",
      parentAuthKey: "admin",
    },
    {
      id: 3,
      name: "账号权限",
      description: "账号权限",
      authKey: "admin.system.accountAuth",
      parentAuthKey: "admin.system",
    },
    {
      id: 4,
      name: "账号管理",
      description: "账号管理权限",
      authKey: "admin.system.accountAuth.accountManagement",
      parentAuthKey: "admin.system.accountAuth",
    },
    {
      id: 5,
      name: "角色管理",
      description: "角色管理权限",
      authKey: "admin.system.accountAuth.roleManagement",
      parentAuthKey: "admin.system.accountAuth",
    },
  ],
  authKeys: [
    "admin",
    "admin.system",
    "admin.system.accountAuth",
    "admin.system.accountAuth.accountManagement",
    "admin.system.accountAuth.roleManagement",
  ],
  roleData: [
    {
      id: 1,
      name: "超级管理员",
      description: "这个是超级管理员用户拥有所有权限",
    },
  ],
};
