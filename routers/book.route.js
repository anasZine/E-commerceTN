const BookController = require('../controllers/book.controller')
const router = require('express').Router()
const guardAuth = require('./guardAuth')
const route = require('./auth.route')
const multer = require('multer')




route.get('/addbook', guardAuth.isAuth, BookController.getAddBookController)

route.post('/addbook', multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'assets/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '_' + file.originalname)
        }
    })
}).single('image'), guardAuth.isAuth, BookController.postAddBookController);

router.get('/books', guardAuth.isAuth, BookController.getAllBooksController);


router.get('/mybooks', BookController.getMybookspage)
router.get('/mybooks/delete/:id', BookController.deleteBookController)
router.get('/mybooks/update/:id', BookController.getMybookUpdatePage)
router.post('/mybooks/update' , multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'assets/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '_' + file.originalname)
        }
    })
}).single('image'), guardAuth.isAuth, BookController.postUpdateBookController);

router.get('/books', guardAuth.isAuth, BookController.postUpdateBookController)







module.exports = router;