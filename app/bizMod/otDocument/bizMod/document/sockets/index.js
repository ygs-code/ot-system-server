import WssSharedb from "./wss-sharedb";

class Sockets {
  constructor(server) {
    console.log("server========", server);
    this.wssShareDB = new WssSharedb(server).wss;
  }
  init() {}

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

export default Sockets;
