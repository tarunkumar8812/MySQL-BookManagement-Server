
// for table creation just like schema of mongoDB 
const pool = require("./db.js")


const createTable = async (req, res) => {
    const result = await pool.query(`
        CREATE TABLE books (
            bookId int auto_increment primary key,
            title varchar(255) unique,
            pages int,
            price int, 
            author varchar(255),
            userId int NOT NULL,
            FOREIGN KEY (bookId) REFERENCES user (id)
        )
    `)


    // CREATE TABLE book (
    //     id int auto_increment,
    //     name varchar(255) unique,
    //     pages int,
    //     author varchar(255),
    //     primary key(id)
    // )


    console.log(result);
    return res.json({ msg: "hello world", data: result })
}



module.exports = { createTable }