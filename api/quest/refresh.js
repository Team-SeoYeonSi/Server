const Quest=require('../../model/quest');

const quest=new Quest();

const refresh=(req,res)=>{
    const qu_no=req.body.qu_no;
    const Update=()=>{
        return new Promise(async (resolve,reject)=>{
            await quest.updateYetQuestToCanceled(qu_no);
            resolve();
        });
    }
    Update()
        .then(()=>{
            res.json({status:'success',message:'success'});
        })
        .catch((err)=>{
            res.json({status:'failure',message:'failure'});
        });
}

module.exports=refresh;