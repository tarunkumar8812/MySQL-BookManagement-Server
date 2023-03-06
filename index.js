const express = require("express");
const router = require("./src/routers/router.js")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", router)



app.use("/*", (req, res) => {
    return res.status(404).send({ status: false, message: `Invalid Path url` })

});


app.listen(process.env.PORT || 3000, function () {
    console.log("Express app running on port " + (process.env.PORT || 3000))
})