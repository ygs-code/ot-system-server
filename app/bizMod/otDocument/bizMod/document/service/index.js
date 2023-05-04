import { captureClassError, getPagParameters } from "utils";

import {
  addDocument,
  createDocument,
  createOpsDocument,
  editDocument,
  queryDocument,
  queryDocumentList,
  removeDocument
} from "@/bizMod/otDocument/db";

@captureClassError()
class Service {
  // 查询列表
  static async queryList(ctx, next, parameter) {
    const { pageNum, pageSize, id, title } = parameter;

    // 查询出列表
    let [list, total] = await queryDocumentList(
      "document",
      {
        and: {
          id,
          title
        },
        andLike: { title }
      },
      {
        pageNum,
        pageSize
      }
    );

    return {
      list,
      ...getPagParameters({
        total: total[0].total,
        pageNum,
        pageSize
      })
    };
  }
  //创建
  static async create(ctx, next, parameter) {
    const { title, create_by, update_by, v, type, content } = parameter;

    let { data: { id } = {}, status } = await createDocument("document", {
      title,
      create_by,
      update_by,
      v,
      type,
      content
    })
      .then((data) => {
        console.log("创建文档成功");
        return {
          data: {
            id: data.insertId
          },
          status: 1
        };
      })
      .catch(() => {
        console.log("创建文档失败");
        return {
          data: {},
          status: 2
        };
      });

    if (status == 1 && id) {
      await createOpsDocument("o_document", {
        id,
        ops: "[]",
        create_by,
        update_by
      })
        .then((data) => {
          console.log("创建ot文档成功");
        })
        .catch((error) => {
          console.log("创建ot文档成功");
          console.log("error===", error);
          id = undefined;
          status = 2;
        });
    }
    return {
      data: {
        id
      },
      status
    };

    // return await Promise.all([
    //   createDocument("document", {
    //     title,
    //     create_by,
    //     update_by,
    //     v,
    //     type,
    //     content
    //   }),
    //   createOpsDocument("o_document", {
    //     ops: "[]",
    //     create_by,
    //     update_by
    //   })
    // ])
    //   .then((data) => {
    //     return {
    //       data: {
    //         id: data[0].insertId
    //       },
    //       status: 1
    //     };
    //   })
    //   .catch(() => {
    //     return {
    //       data: {},
    //       status: 2
    //     };
    //   });
  }
  // 编辑权限
  static async edit(ctx, next, parameter) {
    const { description, id, name, parent_id, auth_key } = parameter;
    let isHas = [];
    /*
     1 查询权限
    */
    let DocumentInfo = await queryDocument({
      id
    });
    DocumentInfo = DocumentInfo[0] || {};

    // 更新name
    if (name !== DocumentInfo.name) {
      isHas = await queryDocument({
        name
      });
      if (isHas.length) {
        return {
          status: 1
        };
      }
    }

    await editDocument({
      description,
      id,
      name,
      parent_id,
      auth_key
    });

    return {
      status: 2
    };
  }
  // 删除权限
  static async remove(ctx, next, { id }) {
    return await removeDocument("document", id)
      .catch(() => {
        return {
          status: 1
        };
      })
      .then(() => {
        return {
          status: 2
        };
      });
  }
  // 数据库中查询权限
  static async query(ctx, next, parameter) {
    const { id } = parameter || {};

    return await queryDocument({
      id
    })
      .then((DocumentInfo) => {
        DocumentInfo = DocumentInfo.length >= 1 ? DocumentInfo[0] : null;
        return DocumentInfo
          ? {
              status: 1,
              data: DocumentInfo
            }
          : {
              status: 2,
              data: {}
            };
      })
      .catch(() => {
        return {
          status: 3,
          data: {}
        };
      });
  }
}

export default Service;
