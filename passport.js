const passport=require('passport');
const KakaoStrategy=require('passport-kakao').Strategy;
const loginByThridParty=require('./api/user/loginByThridParty');
require('dotenv').config();

passport.use(new KakaoStrategy({
    clientID=process.env.KAKAO_CLIENT_ID,
    callbackURL:process.env.KAKAO_CALLBACK_URL
},(accessToken,refresh,profile,done)=>{
    const userProfile=profile._json;
    loginByThridParty({
        auth_type:'kakao',
        auth_id:userProfile.id,
        auth_name:userProfile.properties.nickname,
    },done);
}))

module.exports=passport;