const passport=require('../../passport');

const Login=(req,res)=>{
    passport.authenticate('kakao');
}

module.exports=Login;

