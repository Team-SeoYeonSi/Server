const Member=require('../../../model/member');
const MemberSocial=require('../../../model/member_social');

const member=new Member();
const memberSocial=new MemberSocial();

const LoginByThirdParty=async (info,done)=>{
    let result3;
    try{
        let result1=await memberSocial.getMemberSocialBySocialId(info.auth_id);
        if(result1.length===0){
            let result2=await member.insertMember(info.auth_name);
            result3=await member.getMemberByNick(info.auth_name);
            const mb_no=result3[0].mb_no;
            let result4=await memberSocial.insertMemberSocial(mb_no,'kakao',info.auth_id);
            done(null,{
                mb_no:mb_no,
                ms_social_id:info.auth_id,
                mb_nick:info.auth_name
            });
        }
        else{
            let result2=await member.getMemberByNick(info.auth_name);
            const mb_no=result2[0].mb_no;
            done(null,{
                mb_no:mb_no,
                ms_social_id:result1[0].ms_social_id,
                mb_nick:info.auth_name,
            });
        }
    }
    catch(err){
        done(err);
    }
}

module.exports=LoginByThirdParty;