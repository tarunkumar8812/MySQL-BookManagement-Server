const pool = require("../db.js")
const table_name = `product`



const createUser = async (req, res) => {


    const { fname, lname, title, email, password } = req.body
    const result = await pool.query(`
    INSERT INTO user ( fname, lname, title, email, password )
    VALUES ( "${fname}", "${lname}","${title}", "${email}", "${password}" )`)
    console.log(result[0]);
    return res.json({ msg: "hello world", data: result })
}



const getAllUsers = async (req, res) => {
    // this is for SELECT
    const column_name = `*`
    const select_Min = `MIN (id) AS lowest`
    const select_Max = `MAX (id) AS highest`
    const select_Count = `COUNT(id)`
    const select_Avg = `AVG(id)`
    const select_Sum = `SUM(id)`

    //    this is for table_name
    const table_name = `user`

    // this is for WHERE
    const condition1 = `price > 50`
    const condition2 = `name = "car"`


    // this is for DB call 
    const result = await pool.query(`
    SELECT * 
    FROM ${table_name}
    WHERE id > 0 
    ORDER BY id DESC
    LIMIT 50
    `)
    // WHERE ${condition1} AND id != 1  

    console.log(result[0]);
    return res.json({ msg: "successfull", count: result[0].length, data: result[0] })
}



const getUserById = async (req, res) => {
    const result = await pool.query(` SELECT * FROM user where id = ${req.params.id}`)
    console.log(result[0][0]);
    return res.json({ msg: "hello world", data: result[0] })
}




const updateUser = async (req, res) => {
    const result = await pool.query(`
    UPDATE user
    SET lname = true
    WHERE id = 1;
    `)
    console.log(result[0]);
    return res.json({ msg: "hello world", data: result[0] })
}

const deleteUserById = async (req, res) => {
    const result = await pool.query(`
    DELETE 
    FROM user 
    WHERE id =${req.params.id};
    `)
    console.log(result[0]);
    return res.json({ msg: "hello world", data: result[0] })
}







module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUserById }