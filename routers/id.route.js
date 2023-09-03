const BookController = require('../controllers/book.controller')
const router = require('express').Router()
const guardAuth = require('./guardAuth')
const multer = require('multer')






router.get('/:id', guardAuth.isAuth, BookController.getOneBookDetailsController)
 


module.exports = router;
