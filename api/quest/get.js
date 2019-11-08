const Quest=require('../../model/quest');
const quest=new Quest();
const get=(req,res)=>{
    const GetQuest=()=>{
        return new Promise(async(resolve,reject)=>{
            const result=await quest.getYetQuestByMbNo(req.user.mb_no);
            resolve(result[0]);
        });
    }
    GetQuest()
        .then((r)=>{
            res.json({status:'success',message:'success',data:r});
        })
        .catch((err)=>{
            console.error(err);
            res.json({status:'failure',message:'failure'});
        })
}

module.exports=get;