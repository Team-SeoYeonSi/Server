const session=require('express-session');
const morgan=require('morgan');
const express=require('express');
const passport=require('./passport');
const flash=require('connect-flash');
const app=express();
require('dotenv').config();

app.use(morgan('[:date[iso]] :method :status :url :response-time(ms) :user-agent'));
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
	next();
})
app.use(session({
	secret:process.env.SESSION_SECRET,
	resave:false,
	saveUninitialized:true,
	domain:'.seoyeonsi.bu.to',
	cookie:{
		path:'/',
		domain:'.seoyeonsi.bu.to'
	}
}))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./api'));

app.listen(process.env.SERVER_PORT,()=>{
	console.log(new Date()+' Server is running on port '+process.env.SERVER_PORT);
});