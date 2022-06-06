import mysql from 'mysql';
import { MYSQL_CONF } from '../config/index';
 

// 创建链接对象
const connection  = mysql.createConnection(MYSQL_CONF)


// 统一执行 sql 的函数
const  exec = async (sql)=> {
    return   await  new Promise((resolve, reject) => {
        
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

export {
    connection,
    exec,
}
