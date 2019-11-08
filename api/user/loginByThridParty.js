const User=require('../../model/users');

const LoginByThirdParty=async (info,done)=>{
    const user=new User();
    try{
        let result1=await user.getUserByUserId(info.auth_id);
        if(result1.length===0){
            let result2=await user.insertUser(info.auth_id,info.auth_name);
            done(null,{
                userId:info.auth_id,
                nickname:info.auth_name
            });
        }
        else{
            done(null,{
                userId:result1[0].userId,
                nickname:result1[0].nickname
            });
        }
    }
    catch(err){
        done(err);
    }
}

module.exports=LoginByThirdParty;