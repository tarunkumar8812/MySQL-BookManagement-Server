const express = require("express");
const router = express.Router()
const { createTable, getAllAuthors } = require('../admin/adminController.js')
const { getUserById, createAuthors, authorLogin, updateUser, deleteUserById } = require('../controllers/authorController.js')
const { createBooks, getAllBooks, innerJoinData } = require('../controllers/bookController.js')


// for table creation just like schema of mongoDB 
router.post('/createTable', createTable)
router.get('/getAllAuthors', getAllAuthors)





// Author APIs
router.post('/createAuthors', createAuthors)
router.post('/authorLogin', authorLogin)
// router.get('/', getAllAuthors)
router.get('/getUserById/:id', getUserById)
router.put('/updateUser', updateUser)
router.delete('/deleteUserById/:id', deleteUserById)





// books APIs
router.post('/createBooks', createBooks)
router.get('/getAllBooks', getAllBooks)
router.get('/innerJoinData', innerJoinData)




module.exports = router