const router = require('express').Router()
const contactController=require('../controllers/contact.controller')



router.get('/contact',contactController.getPageContact)


module.exports=router