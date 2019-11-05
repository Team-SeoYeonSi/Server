const session=require('express-session');
const morgan=require('morgan');
const express=require('express');
const app=express();
require('dotenv').config();

app.use(morgan('[:date[iso]] :method :status :url :response-time(ms) :user-agent'));
app.use(session({
	secret:process.env.SESSION_SECRET,
	resave:false,
	saveUninitialized:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/update',require('./update'));

app.listen(process.env.SERVER_PORT,()=>{
	console.log('Server is running on port '+process.env.SERVER_PORT);
});
