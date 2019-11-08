const express=require('express');
const router=express.Router();

const login=require('./login');
const loginCallback=require('./loginCallback');

router.get('/login/callback',loginCallback);
router.get('/login',login);


module.exports=router;