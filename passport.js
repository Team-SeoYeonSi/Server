const passport=require('passport');
const KakaoStrategy=require('passport-kakao').Strategy;
const loginByThridPartyKaKao=require('./api/member/kakao/loginByThridParty');
require('dotenv').config();

passport.use(new KakaoStrategy({
    clientID:process.env.KAKAO_CLIENT_ID,
    callbackURL:process.env.KAKAO_CALLBACK_URL
},(accessToken,refresh,profile,done)=>{
    const userProfile=profile._json;
    loginByThridPartyKaKao({
        auth_type:'kakao',
        auth_id:userProfile.id,
        auth_name:userProfile.properties.nickname,
    },done);
}));
passport.serializeUser((user,done)=>{
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    done(null,user);
});

module.exports=passport;