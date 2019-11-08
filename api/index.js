const express=require('express');
const router=express.Router();

const member=require('./member');
const post=require('./post');
const quest=require('./quest');
const upload=require('./upload');

router.use('/member',member);
router.use('/post',post);
router.use('/quest',quest);
router.get('/success',(req,res)=>{
    res.json(req.user);
});
router.get('/failure',(req,res)=>{
    res.send('failure');
});
router.post('/upload',upload);
module.exports=router;