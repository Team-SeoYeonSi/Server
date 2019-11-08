const passport=require('../../passport');
const LoginCallback=(req,res)=>{
    passport.authenticate('kakao',{
        successRedirect:'/success',
        failureRedirect:'/failure',
    });
}
module.exports=LoginCallback;