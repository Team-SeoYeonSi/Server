const express=require('express');
const router=express.Router();
const passport=require('../../passport');

router.get('/login/callback',passport.authenticate('kakao',{
    successRedirect:'/success',
    failureRedirect:'/failure',
}));
router.get('/login',passport.authenticate('kakao'));


module.exports=router;