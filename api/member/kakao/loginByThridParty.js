const Member=require('../../../model/member');
const MemberSocial=require('../../../model/member_social');

const LoginByThirdParty=async (info,done)=>{
    const member=new Member();
    const memberSocial=new MemberSocial();
    try{
        let result1=await memberSocial.getMemberSocialBySocialId(info.auth_id);
        if(result1.length===0){
            let result2=await member.insertMember(info.auth_name);
            let result3=await member.getMemberByNick(info.auth_name);
            const mb_no=result3[0].mb_no;
            let result4=await memberSocial.insertMemberSocial(mb_no,'kakao',info.auth_id);
            done(null,{
                ms_social_id:info.auth_id,
                mb_nick:info.auth_name
            });
        }
        else{
            done(null,{
                ms_social_id:result1[0].ms_social_id,
                mb_nick:result3[0].mb_nick
            });
        }
    }
    catch(err){
        done(err);
    }
}

module.exports=LoginByThirdParty;