const pool = require("../db.js")


const getAllUsers = async (req, res) => {
    const result = await pool.query(` SELECT * FROM product `)
    console.log(result[0]);
    return res.json({ msg: "hello world", data: result[0] })
}

const getUserById = async (req, res) => {
    const result = await pool.query(` SELECT * FROM product where id = ${req.params.id}`)
    console.log(result[0]);
    return res.json({ msg: "hello world", data: result[0] })
}


module.exports = { getAllUsers, getUserById }