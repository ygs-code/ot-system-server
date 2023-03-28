import redis from "redis";

import { REDIS_CONF } from "../config";
import { promise } from "../utils";

class RedisClass {
  constructor(port, url, options = {}) {
    this.port = port;
    this.url = url;
    this.options = options;
  }
  //连接
  createRedisClient() {
    this.redisClient = redis.createClient(this.port, this.url, this.options);
  }
  // 连接
  connect(callback = () => {}) {
    return promise((resolve) => {
      this.redisClient.on("connect", () => {
        callback();
        resolve();
      });
    });
  }
  ready(callback = () => {}) {
    return promise((resolve, reject) => {
      this.redisClient.on("ready", (error, res) => {
        if (error) {
          callback(error);
          reject(error);
        } else {
          resolve(res);
        }
      });
    });
  }
  error(callback = () => {}) {
    return promise((resolve, reject) => {
      this.redisClient.on("error", (error) => {
        callback(error);
        reject(error);
      });
    });
  }
  end(callback = () => {}) {
    return promise((resolve, reject) => {
      this.redisClient.on("end", (error, res) => {
        if (error) {
          callback(error);
          reject(error);
        } else {
          resolve(res);
        }
      });
    });
  }
  async set(key, value, callback = () => {}, options = () => {}) {
    await promise((resolve, reject) => {
      this.redisClient.set(key, value, (error, res) => {
        if (error) {
          callback(error);
          reject(error);
        } else {
          callback(res);
          resolve(res);
        }
      });

      let keys = Object.keys(options);
      keys.forEach((_key) => {
        this.redisClient[_key](key, options[_key]);
      });
    });
  }
  getKeys(key, callback = () => {}) {
    return promise((resolve, reject) => {
      this.redisClient.keys(key, (error, res) => {
        if (error) {
          callback(error);
          reject(error);
        } else {
          resolve(res);
          callback(res);
        }
      });
    });
  }
  get(key, callback = () => {}) {
    return promise((resolve, reject) => {
      this.redisClient.get(key, (error, res) => {
        if (error || !res) {
          callback(error || res);
          reject(error || res);
        } else {
          resolve(res);
        }
      });
    });
  }
  del(key, callback = () => {}) {
    return promise((resolve, reject) => {
      this.redisClient.del(key, (error, res) => {
        if (error) {
          callback(error);
          reject(error);
        } else {
          resolve(res);
        }
      });
    });
  }
  pexpire(key, time) {
    this.redisClient.pexpire(`${key}`, time);
  }
  init() {
    this.createRedisClient();
    return this;
  }
}

export const Redis = new RedisClass(
  REDIS_CONF.port,
  REDIS_CONF.host,
  REDIS_CONF.options
);

Redis.init();
export const redisClient = Redis.redisClient;
export default RedisClass;
