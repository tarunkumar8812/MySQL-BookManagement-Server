
// const { uploadFile } = require("../AWS/aws");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const pool = require("../admin/db.js")
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId()//.stamp(12);
const { validTitle, validFName, validLName, validPhone, validEmail, validPassword, validStreet, validCity, validPincode,
    validAddress, validPW_4_Login, validProfileImage, validRest, V_address, V_Sub_address, V_street, V_city, V_pincode } = require('../validations/validAuthor.js')




const createAuthors = async (req, res) => {
    try {
        // destucturing data from the body
        let { title, fName, lName, email, phone, password, street, city, pincode } = req.body

        const errors = []

        //-------- cheking mandatory fields --------
        const requiredFields = ["title", "fName", "lName", "email", "phone", "password", "street", "city", "pincode"];
        for (field of requiredFields) {
            if (!Object.keys(req.body).includes(field)) { errors.push(` ${field}`) }
        }


        if (req.files.length == 0) { errors.push("profilePhoto") }

        // checking for mandatory fileds
        if (errors.length > 0) { return res.status(400).send({ status: false, message: `( ${errors} ) is/are mandatory` }); }




        //-----------validations for all fileds -----------
        validTitle(title, errors)
        validFName(fName, errors)
        validLName(lName, errors)
        validPhone(phone, errors)
        validEmail(email, errors)
        // validPassword(password, errors)  // just uncomment this line to apply password validations
        validStreet(street, errors)
        validCity(city, errors)
        validPincode(pincode, errors)
        validProfileImage(req.files, errors)

        if (errors.length > 0) { return res.status(400).send({ status: false, message: `( ${errors} )` }); }



        //  ------- checking uniqueness of phone no. -------
        let phoneInDataBase = await pool.query(`
        SELECT phone 
        FROM authors
        WHERE phone = ${phone}
    `)

        if (phoneInDataBase[0].length > 0) {
            return res
                .status(409)
                .send({ status: false, message: `This '${phone}' Phone no. is already registered` })
        }



        //  ---------checking uniqueness of email ---------
        let emailInDataBase = await pool.query(`
            SELECT email     
            FROM authors
            WHERE email = "${email}"
        `)

        if (emailInDataBase[0].length > 0) {
            return res
                .status(409)
                .send({ status: false, message: `This '${email}' Email is already registered` })
        }


        // creating a unique id of 24 letters
        const authorId = uid.stamp(24);

        // hashing the password using bcrypt
        password = await bcrypt.hash(password.trim(), 10);


        // creating link for image using AWS
        // const profilePhoto = await uploadFile(req.files[0]);
        // console.log("profilePhoto")
        // console.log(profilePhoto)



        // inserting new author in authors table in database
        const result = await pool.query(`
            INSERT INTO authors (authorId, title, fName, lName, email, phone, password, street, city, pincode, profilePhoto)
            VALUES ( "${authorId}", "${title}", "${fName}", "${lName}", "${email.toLowerCase()}", "${phone}", "${password}", "${street}", "${city}", "${pincode}", "${title} ${fName} ${lName}'s profile Photo" )
        `)


        return res
            .status(201)
            .json({ status: true, messsge: "Author's Registration Successfull", data: result[0] })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}




// -------------------------------- Author's Login API -------------------------------


const authorLogin = async (req, res) => {

    try {

        const credentials = req.body
        let { email, password } = credentials;

        //  ---------checking uniqueness of email ---------
        let authorInDataBase = await pool.query(`
            SELECT *     
            FROM authors
            WHERE email = "${email}"
        `)
        // console.log(authorInDataBase[0][0]);

        if (authorInDataBase[0].length == 0) {
            return res
                .status(401)
                .send({ status: false, message: "invalid credentials (email or the password is incorrect)!!", })
        }


        // ---------- compairing password using bcrypt ------------
        bcrypt.compare(password.trim(), authorInDataBase[0][0].password, function (err, result) {

            if (result !== true) {
                return res
                    .status(401)
                    .send({ success: false, message: "incorrect password!!" });
            } else {

                // ---------- creating JWT Token ------------
                let token = JWT.sign(
                    {
                        authorId: authorInDataBase[0][0].authorId,
                        isAdmin: authorInDataBase[0][0].isAdmin,
                        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // After 24 hour it will expire
                        iat: Math.floor(Date.now() / 1000),
                    },
                    "this is secret don't tell this anyone !!"
                );


                let data = { token: token, authorId: authorInDataBase[0][0].authorId };

                return res
                    .status(200)
                    .send({ status: true, message: "author login successfull", data: JSON.stringify(data), });
            }
        });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
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







module.exports = { createAuthors, authorLogin, getUserById, updateUser, deleteUserById }