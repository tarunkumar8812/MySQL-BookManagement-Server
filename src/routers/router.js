const express = require("express");
const router = express.Router()
const { getAllUsers, getUserById, createUser, updateUser, deleteUserById } = require('../controllers/userController.js')


const { createBooks, getAllBooks, innerJoinData } = require('../controllers/bookController.js')



const { createTable } = require('../createTables.js')


router.get('/', getAllUsers)
router.get('/getAllUsers', getAllUsers)
router.get('/getUserById/:id', getUserById)
router.post('/createUser', createUser)
router.put('/updateUser', updateUser)
router.delete('/deleteUserById/:id', deleteUserById)

// books API's
router.post('/createBooks', createBooks)
router.get('/getAllBooks', getAllBooks)
router.get('/innerJoinData', innerJoinData)




// for table creation just like schema of mongoDB 
router.post('/createTable', createTable)

module.exports = router