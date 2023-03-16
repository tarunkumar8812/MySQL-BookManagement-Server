const express = require("express");
const router = express.Router()
const { createTable, getAllAuthors } = require('../admin/adminController.js')
const { getAuthorProfile, createAuthors, authorLogin, updateAuthor, deleteAuthorById } = require('../controllers/authorController.js')
const { createBooks, getAllBooks, innerJoinData } = require('../controllers/bookController.js')


// for table creation just like schema of mongoDB 
router.post('/createTable', createTable)
router.get('/getAllAuthors', getAllAuthors)



// Author APIs
router.post('/createAuthors', createAuthors)
router.post('/authorLogin', authorLogin)
router.get('/getAuthorProfile/:authorId', getAuthorProfile)
router.put('/updateAuthor', updateAuthor)
router.delete('/deleteAuthorById', deleteAuthorById)



// books APIs
router.post('/createBooks', createBooks)
router.get('/getAllBooks', getAllBooks)
router.get('/innerJoinData', innerJoinData)




module.exports = router