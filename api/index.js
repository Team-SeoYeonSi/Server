const express=require('express');
const router=express.Router();

const user=require('./user');

router.use('/user',user);
router.get('/success',(req,res)=>{
    res.send('success');
});
router.get('/failure',(req,res)=>{
    res.send('failure');
});

module.exports=router;