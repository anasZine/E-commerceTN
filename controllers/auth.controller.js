const authModel= require('../models/auth.model')




exports.getRegisterPage=(req,res,next)=>{

    res.render('register',{verifUser:req.session.userId,message:req.flash('error')[0]})
}


exports.postRegisterData =(req ,res,next) =>{
authModel.registerFunctionModel(req.body.name,req.body.email,req.body.password).then((user)=>{
    res.redirect('/login')//login
}).catch((err)=>{
//console.log(msg)
req.flash('error',err)
res.redirect('/register')
})
}

////////////////////////////////////////


exports.getLoginPage=(req,res,next)=>{

    res.render('login',{verifUser:req.session.userId,message:req.flash('error')[0]})//login
}

exports.postLoginData =(req ,res,next) =>{
authModel.loginFunctionModel(req.body.email,req.body.password).then((id)=>{

    req.session.userId=id
    res.redirect('/')

}).catch((err)=>{
req.flash('error',err)
    //console.log(err)
    res.redirect('/login')//login
})
}

//////////////////////////////////////////

exports.logoutFunctionController=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}