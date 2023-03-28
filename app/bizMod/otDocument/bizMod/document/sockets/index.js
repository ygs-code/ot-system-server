import WssSharedb from "./wss-sharedb";

class Sockets {
  constructor() {
    this.init();
  }
  init() {
    this.wssShareDB = new WssSharedb().wss;
  }
   
  document({ request, socket, head, params }) {
 
    const { documentId, documentType } = params; // 如果没有id则不给连接
    if (!documentId || !documentType) {
      return socket.end();
    }
    this.wssShareDB.handleUpgrade(request, socket, head, (ws) => {
      // 拿到参数 做拦截
      this.wssShareDB.emit("connection", ws, request, params);
    });
  }
}

export default new Sockets();
