import mysql from "mysql"

export const db  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'blog'
})
// export const pool  = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'localhost',
//     user            : 'root',
//     password        : 'password',
//     database        : 'nodejs_beers'
// })