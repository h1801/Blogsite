const express = require('express');
const router = express.Router();
const authCheck = function (request,response,next){
    if(!request.user){
        //if user is not logged in
        response.redirect('/auth/login');
    } else {
        next();
    }
}


router.get('/',authCheck,function(request,response){
    response.render('profile',{title : 'Profile' , user: request.user });

});

module.exports=router;