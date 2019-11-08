const express=require('express');
const router=express.Router();

const member=require('./member');
const upload=require('./upload');

router.use('/member',member);
router.get('/success',(req,res)=>{
    res.send('success');
});
router.get('/failure',(req,res)=>{
    res.send('failure');
});
router.post('/upload',upload)
module.exports=router;