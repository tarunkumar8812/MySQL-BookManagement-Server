const express = require("express");
const mysql = require("mysql2")
// require("dotenv").config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const pool = mysql.createPool({
    host: "127.0.0.1",
    user: 'root',
    password: '881234',
    database: 'assignment1'
}).promise()



app.use("/", async (req, res) => {
    const result = await pool.query(`SELECT * FROM product`)
    console.log(result[0]);
    console.log("hello world");
    return res.json({ msg: "hello world", data: result[0] })
})



app.listen(process.env.PORT || 3000, function () {
    console.log("Express app running on port " + (process.env.PORT || 3000))
})