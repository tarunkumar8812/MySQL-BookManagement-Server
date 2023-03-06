const express = require("express");
const router = require("./src/routes/route.js")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const pool = require("./src/db.js")


app.use("/", async (req, res) => {
    const result = await pool.query(` SELECT * FROM product `)
    console.log(result[0]);
    return res.json({ msg: "hello world", data: result[0] })
})



// app.use("/*", (req, res) => {
//     return res.status(404).send({ status: false, message: `Invalid Path url` })

// });


app.listen(process.env.PORT || 3000, function () {
    console.log("Express app running on port " + (process.env.PORT || 3000))
})