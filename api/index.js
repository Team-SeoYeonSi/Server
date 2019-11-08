const express=require('express');
const router=express.Router();

const member=require('./member');

router.use('/member',member);
router.get('/success',(req,res)=>{
    res.send('success');
});
router.get('/failure',(req,res)=>{
    res.send('failure');
});

module.exports=router;