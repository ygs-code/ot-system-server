import redis from 'redis';
import { merge, promise } from '../utils';
import { REDIS_CONF } from '../config';
class RedisClass {
    constructor(port, url, options = {}) {
        this.port = port;
        this.url = url;
        this.options = options;
    }
    //连接
    createRedisClient() {
        this.redisClient = redis.createClient(
            this.port,
            this.url,
            this.options
        );
    }
    // 连接
    connect(callback = () => {}) {
        return promise((resolve, reject) => {
            this.redisClient.on('connect', () => {
                callback();
                resolve();
            });
        });
    }
    ready(callback = () => {}) {
        return promise((resolve, reject) => {
            this.redisClient.on('ready', (err, res) => {
                if (err) {
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
            this.redisClient.on('error', (error) => {
                callback(error);
                reject(error);
            });
        });
    }
    end(callback = () => {}) {
        this.redisClient.on('end', (err, res) => {
            if (err) {
                callback(error);
                reject(error);
            } else {
                resolve(res);
            }
        });
    }
    set(key, value, callback = () => {},options=()=>{}) {
      return promise((resolve, reject) => {
        this.redisClient.set(key, value, (error, res) => {
            if (error) {
                callback(error);
                reject(error);
            } else {
                let keys = Object.keys(options) 
                keys.forEach((_key)=>{
                  this.redisClient[_key](key,options[key])
                })
                callback(res);
                resolve(res);
            }
        });
    });

    }
    get(key,callback=()=>{}) {
        return promise((resolve, reject) => {
            this.redisClient.get(key, (error, res) => {
                if (error) {
                    callback(error);
                    reject(error);
                } else {
                    resolve(res);
                }
            });
        });
    }
    del(key,callback=()=>{}){
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
