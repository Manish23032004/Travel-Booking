const express = require("express")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const nodemailer = require('nodemailer');
const mongoose=require("mongoose");



const app = express()
app.use(express.json());

app.set('view engine', 'ejs');

  app.use(bodyParser.urlencoded());       //important for data base

// connection of mongoose

mongoose.set("strictQuery",true);
mongoose
  .connect("mongodb://0.0.0.0:27017/contactDB")
  .then(()=>console.log("connected to the database server at port 27017 !!!"));

// for contact form
  const UserSchema= {
    fname:{
      type:String,
      require:true
    },
    
    lname:{
      type:String,
      require:true
    } ,
    Pno:{
      type:Number,
      require:true

    },
    email:{
      type: String,
      require:true

    },
    
    text: {
      type:String,
      require:true
    },

    // for book form
    Pname:{
      type:String,
      require:true


  },
  Hname:{
    type:String,
    require:true


  },
  Atime:{
    type:Date,
    require:true,


  },
  Ltime:{
    type:Date,
    require:true

  },

  // for signup form
  username:{
    type:String,
    require:true


},
email:{
  type:String,
  require:true


},
password:{
  type:String,
  require:true


},
cpassword:{
  type:String,
  require:true


},

   

 } 

 const User = new mongoose.model('User',UserSchema)

// for contact form
app.post('/contact',function  (req, res) {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const Pno = req.body.Pno;
  const email = req.body.email;
  const text = req.body. text;
  const newUser=User({
   fname:fname,
   lname:lname,
   Pno:Pno,
   email:email

  });

  console.log(fname);
  console.log(lname);
  console.log(Pno);
  console.log(email);
  console.log(text);
   
newUser.save();

})

 

  
// for book form
app.post('/book',function  (req, res) {
  const Pname = req.body.Pname;
  const Hname = req.body.Hname;
  const Atime = req.body. Atime;
  const Ltime = req.body.Ltime;
   
  const newUser=User({
    Pname:Pname,
    Hname:Hname,
    Atime:Atime,
    Ltime :Ltime 

  });

  console.log( Pname);
  console.log(Hname);
  console.log(Atime);
  console.log( Ltime);
   
   
newUser.save();

})
 
// for signup form
app.post('/signup',async function  (req, res) {

  const data={
    username:req.body. username,
    email:req.body. email,
    password:req.body. password,
    cpassword:req.body.cpassword 

  }
//   const username = req.body. username;
//   const email = req.body.email;
//   const password = req.body. password;
//   const cpassword  = req.body.cpassword ;
   
//   const newUser=User({
//     username:username,
//     email:email,
//     password:password,
//     cpassword  :cpassword 

//   });

//   console.log( username);
//   console.log( email);
//   console.log(password );
//   console.log( cpassword );
   
   
// newUser.save();

await User.insertMany([data])

  
 

})

app.post('/login',async(req, res)=>{

  try{
    const check=await User.findOne({username:req.body.username}) 

    if(check.password===req.body.password){
      res.render("travel")
    }
    else {
      res.send("Wrong password")
    }
     
  }
  catch{
    res.send("Wrong details")
  }
   
})

module.exports=User
 



 




app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

 


 
app.get("/signup",function(req,res){
  res.render("signup")
})

app.get("/login",function(req,res){
  res.render("login")
})


 
     
  
 
       
       

  

 

app.get("/",function(req,res){
  res.render("travel")
})

app.get("/contact",function(req,res){
  res.render("contact")
})

app.get("/package",function(req,res){
  res.render("package")
})
app.get("/book",function(req,res){
  res.render("book")
})
app.get("/Gallery",function(req,res){
  res.render("Gallery")
})

app.get("/service",function(req,res){
  res.render("service")
})
 

app.listen(8000, function () {
  console.log("server started on port no 8000")
})

