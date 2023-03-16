
// for table creation just like schema of mongoDB 
const pool = require("./db.js")


const createTable = async (req, res) => {
    const result = await pool.query(`
        CREATE TABLE authors (
            id int auto_increment NOT NULL primary key ,
            authorId varchar(255) unique NOT NULL ,
            title ENUM('Mr', 'Mrs', 'Miss', 'Others') ,
            fName varchar(255) NOT NULL ,
            lName varchar(255) NOT NULL ,
            email varchar(255) NOT NULL unique ,
            phone varchar(255) NOT NULL unique ,
            password varchar(255) NOT NULL ,
            street varchar(255) NOT NULL ,
            city varchar(255) NOT NULL ,
            pincode varchar(10) NOT NULL , 
            isDeleted int DEFAULT 0 ,
            isAdmin int DEFAULT 0 ,
            profilePhoto varchar(255) ,
            createdAt TIMESTAMP DEFAULT now() NOT NULL ,
            updatedAt TIMESTAMP DEFAULT now() ON UPDATE now() NOT NULL 
        )
    `)

    // console.log(result);
    return res.status(201).json({ status: true, message: "authors Table created Successfully " })
}

const createBookTable = async (req, res) => {
    const result = await pool.query(`
        CREATE TABLE books (
            id int auto_increment NOT NULL primary key ,
            bookId varchar(255) unique NOT NULL ,
            title varchar(255) unique NOT NULL ,
            pages int NOT NULL ,
            price int NOT NULL , 
            genre SET ()
            isDeleted int DEFAULT 0 ,
            bookPhoto varchar(255) ,
            aId int NOT NULL,
            FOREIGN KEY (aId) REFERENCES authors (id) ,
            createdAt TIMESTAMP DEFAULT now() NOT NULL ,
            updatedAt TIMESTAMP DEFAULT now() ON UPDATE now() NOT NULL 
        )
    `)

    // const result = await pool.query(`
    //     CREATE TABLE books (
    //         bookId int auto_increment primary key,
    //         title varchar(255) unique,
    //         pages int,
    //         price int, 
    //         author varchar(255),
    //         userId int NOT NULL,
    //         FOREIGN KEY (bookId) REFERENCES user (id)
    //     )
    // `)


    // console.log(result);
    return res
        .status(201)
        .json({ status: true, message: "books Table created Successfully " })
}


const getAllAuthors = async (req, res) => {
    // this is for SELECT
    const column_name = `*`
    const select_Min = `MIN (id) AS lowest`
    const select_Max = `MAX (id) AS highest`
    const select_Count = `COUNT(id)`
    const select_Avg = `AVG(id)`
    const select_Sum = `SUM(id)`

    //    this is for table_name
    const table_name = `authors`

    // this is for WHERE
    const condition1 = `price > 50`
    const condition2 = `name = "car"`


    // this is for DB call 
    const result = await pool.query(`
        SELECT * 
        FROM ${table_name}
   
    `)

    // WHERE id > 0 
    // ORDER BY id DESC
    // LIMIT 50
    // WHERE ${condition1} AND id != 1  

    // console.log(result[0]);
    return res.json({ msg: "successfull", count: result[0].length, data: result[0] })
}

const alterAuthorTable = async (req, res) => {
    const result = await pool.query(`
        ALTER TABLE users
        ADD COLUMN timeStamp date AFTER isDeleted;
    `)

    console.log(result);
    return res.json({ msg: "hello world", data: result })
}


const dropTable = async (req, res) => {
    const result = await pool.query(`
        DROP TABLE TABLE_NAME
        `)

    console.log(result);
    return res.json({ msg: "hello world", data: result })
}



module.exports = { createTable, getAllAuthors, alterAuthorTable, dropTable }