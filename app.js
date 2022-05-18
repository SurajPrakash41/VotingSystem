//jshint esversion:6
const express = require ("express");
const bodyParser =require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");

const app=express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewurlParser :true});

const userSchema ={
	email:String,
	password:String
};
const user=new mongoose.model("User",userSchema);

app.get("/",function(req,res)
{
	res.render("home");
});

//  -------------------------------------------------------USERS----------------------------------------------
app.get("/users",function(req,res)
{
	res.render("users");
});
app.post("/users",function(req,res)
{
const newUser= new user({
	email:req.body.signemail,
	password:req.body.signpass
});
newUser.save(function(err)
{
	if(err)
	{console.log(err);}
	else{
		res.render("user/userhome");
	}
});
});

//--------------------------------------------------ADMIN-----------------------------------------
app.get("/admin",function(req,res)
{
	res.render("admin");
});




app.listen(3000,function()
{
	console.log("Server started on port 3000.")
});
