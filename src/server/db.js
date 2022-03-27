const mysql = require('mysql')

const config = {
  database: 'teamwork',
  user: 'root',
  password: 'wcj123456' 
}

exports.db = (sql, sqlParams) => {
  sqlParams = sqlParams || [];
  return new Promise((resolve, reject) => {
    const pool = mysql.createPool(config)
    pool.getConnection((err, conn) => {
      if(!err) {
        conn.query(sql, sqlParams, (e, results) => {
          if(!e) {
            // console.log(results);
            resolve(results);
            conn.destroy();
          }else {
            console.log('sql err:' + e);
            reject(e);
          }
        })
      }else {
        console.log('conn err:' + err);
        reject(err);
      }
    })
  })
}

