const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

const authCheck = function (request,response,next){
    if(!request.user){
        //if user is not logged in
        response.redirect('/auth/login');
    } else {
        next();
    }
}

router.get('/create',authCheck, blogController.blog_create_get);
router.get('/', authCheck, blogController.blog_index);
router.post('/', authCheck, blogController.blog_create_post);
router.get('/:id', authCheck, blogController.blog_details);
router.delete('/:id', authCheck, blogController.blog_delete);

module.exports = router;