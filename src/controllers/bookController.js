const pool = require("../db.js")



// create books API
const createBooks = async (req, res) => {

    const { title, pages, price, author, userId } = req.body

    const result = await pool.query(`
    INSERT INTO books ( title, pages, price, author, userId )
    VALUES ( "${title}", ${pages}, ${price}, "${author}", ${userId} )`)

    console.log(result[0]);

    return res.json({ msg: "hello world", data: result })
}



const getAllBooks = async (req, res) => {
    // this is for SELECT
    const column_name = `*`
    const select_Min = `MIN (id) AS lowest`
    const select_Max = `MAX (id) AS highest`
    const select_Count = `COUNT(id)`
    const select_Avg = `AVG(id)`
    const select_Sum = `SUM(id)`

    //    this is for table_name
    const table_name = `books`

    // this is for WHERE
    const condition1 = `price > 50`
    const condition2 = `name = "car"`


    // this is for DB call 
    const result = await pool.query(`
    SELECT ${column_name} 
    FROM ${table_name}
    `)
    // WHERE ${condition1} AND id != 1  

    console.table(result[0]);
    return res.json({ msg: "successfull", count: result[0].length, data: result[0] })
}


const innerJoinData = async function (req, res) {

    const result = await pool.query(`
        SELECT * FROM user
        LEFT JOIN books
        ON user.id = books.userId
    `)

    console.table(result[0]);
    
    return res.send({ status: true, count: result[0].length, data: result[0] })
}


module.exports = { createBooks, getAllBooks, innerJoinData }
