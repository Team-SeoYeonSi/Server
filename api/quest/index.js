const express=require('express');
const router=express.Router();

const create=require('./create');
const get=require('./get');
const refresh=require('./refresh');

router.post('/create',create);
router.get('/get',get);
router.post('/refresh',refresh);

module.exports=router;