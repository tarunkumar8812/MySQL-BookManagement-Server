const mysql = require("mysql2")


const pool = mysql.createPool({
    host: "127.0.0.1",

    user: 'root',
    password: '',
    database: 'mydb'
}).promise()

const result = await pool.query(`
SELECT * FROM product
`)
console.log(result);
