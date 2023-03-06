const express = require("express");
const router = express.Router()
const { getAllUsers, getUserById } = require('../controllers/controller.js')


router.get('/getAllUsers', getAllUsers)
router.get('/getUserById/:id', getUserById)

module.exports = router