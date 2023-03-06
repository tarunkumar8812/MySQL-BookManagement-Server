const mysql = require("mysql2")
require("dotenv").config()


const pool = mysql.createPool({
    host: "127.0.0.1",
    user: 'root',
    password: '881234',
    database: 'assignment1'
}).promise()

module.exports = pool