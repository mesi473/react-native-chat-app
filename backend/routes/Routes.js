const express=require('express');
const app=express();
const multer  = require('multer');
const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null ,'./uploads/')
    },
    filename:function(req,res,cb){
        cb(null,res.originalname)
    }
})
// const upload = multer({ dest: 'uploads/' });
const upload=multer({storage:storage})

const UsersModel=require('../model/UsersModel');
const MessageModel=require("../model/MessageModel");
const FreindRequest=require("../model/FriendRequestModel");
const ImageModel=require('../model/ImageModel');
const profileImages=require('../model/PofileImage');

app.post('/register',async (req,res)=>{
    const message=[];
    const fname=req.body.firstName;
    const lname=req.body.lastName;
    const uname=req.body.userName;
    const password=req.body.password;
    const conpassword=req.body.conpassword;
    const email=req.body.email;
    const phoneNumber=req.body.phoneNumber;

    await UsersModel.findOne({userName:uname}).then(
        (user)=>{
            if(user){
                res.json({error:"username already exist"});
            }else{
                if(password!=conpassword){
                    res.json({error:"password and confirm password must be the same"});
                }else{
                    UsersModel.findOne({userName:uname}).then(user1=>{
                        if(user1){
                            res.json({error:"user name is already exist"});
                        }else{
                            if(!Number(phoneNumber)){
                                res.json({error:"phone number must be a number with 10 digit"});
                            }else{
                                if(uname===''||fname===''||password===''||email===''||lname===''){
                                    res.json({error:"all fields are required"});
                                }else{
                                    const newUser=new UsersModel({
                                        firstName:fname,
                                        lastName:lname,
                                        password:password,
                                        email:email,
                                        userName:uname,
                                        phoneNumber:phoneNumber
                                    });
                                    newUser.save().then(
                                        res.json({success:"success",user:newUser})
                                    ).catch(err=>console.log(err));
                                }
                            }
                        }
                    }).catch(err=>console.log(`error happen on searching uname from the databases ${err}`));
                }
            }
        }
    ).catch(err=>console.log(`error is occured on finding email form database ${err}`));
});
app.post("/login",async (req,res)=>{
    const uname=req.body.userName;
    const password=req.body.password;

    await UsersModel.findOne({userName:uname}).then(user=>{
        if(user){
            if(user.password===password){
                res.json({success:"success",user:user});
            }else{
                res.json({error:"incorrect password"})
            }
        }else{
            res.json({error:`incorrect username ${uname} ${user}`});
        }
    }).catch(err=>console.log(err));
});
app.post("/chat",async (req,res)=>{
    await MessageModel.find({$or:[{sender:req.body.sender,reciever:req.body.reciever},{sender:req.body.reciever,reciever:req.body.sender}]})
        .then(user=>{
            if(user){
                res.json(user);
            }else{
                res.json({error:'error'});
            }
    }).catch(err=>console.log(err));
});
app.post("/messages",async (req,res)=>{
    const reciever=req.body.reciever;
    const sender=req.body.sender;
    const message=req.body.message;
    await UsersModel.find({$or:[{userName:reciever},{userName:sender}]}).then(
        user=>{
            if(user){
                const newMessage=new MessageModel({
                    reciever:reciever,
                    sender:sender,
                    message:message
                }).save().then(res.json({success:"success"})).catch(err=>console.log(err));
            }else{
                res.json({error:"error"});
            }
        }
    ).catch(err=>console.log(err));
});
app.post("/freindRequests",async (req,res)=>{
    const sender=req.body.sender;
    const reciever=req.body.reciever;
    if(sender!='' && reciever!=''){
        await new FreindRequest({
            sender:sender,
            reciever:reciever,
            acceptance:''
        }).save().then(
            res.json({success:"success",sender:sender,reciever:reciever})
        ).catch(err=>console.log(err));
    }
    else{
        res.json({error:"error"});
    }
});
app.post("/frinedReguestAcceptance",async (req,res)=>{
    const reciever=req.body.reciever;
    const sender=req.body.sender;
    await FreindRequest.updateOne({$and:[{sender:sender},{reciever:reciever}]},{acceptance:"accept"});
});
app.post("/checkAcceptance",async (req,res)=>{
    const uname=req.body.userName;
    await FreindRequest.find({$and:[{acceptance:"accept"},{$or:[{reciever:uname},{sender:uname}]}]}).then(
        users=>{
            if(users){
                res.json({users:users});
            }
            else{
                res.json({error:"error"});
            } 
        }
    )
})
app.post("/search", async (req,res)=>{
    
});
app.post("/users",async (req,res)=>{
    await UsersModel.find({$nor:[{userName:req.body.userName}]}).sort({userName:1}).then(users=>{
        if(users){
            res.json(users)
        }
    }).catch(err=>console.log(err));
});
app.post("/",async (req,res)=>{
    await FreindRequest.find({$nor:[{acceptance:"accept"}]}).then(
        user=>{
            if(user){
                res.json(user);
            }
        }
    ).catch(err=>console.log(err));
})
app.post('/upload',upload.single('profileImages'), (req, res,next) => {
    const newImage=new ImageModel({
        imageName:req.file.originalname,
        userName:req.body.userName,
        caption:req.body.caption,
    }).save().then(res.json({success:"successfully uploaded"})).catch(err=>console.log(err));
});

app.post('/uploadprofile',upload.single('profileImages'), (req, res,next) => {
            const newProfileImages=new profileImages({
                imageName:req.file.originalname,
                userName:req.body.userName,
            }).save().then(res.json({success:"successfully uploaded"})).catch(err=>console.log(err));
      
  });
app.post("/images",(req,res)=>{ 
    const uname=req.body.userName; 
    FreindRequest.find({$and:[{acceptance:"accept"},{$or:[{reciever:uname},{sender:uname}]}]})
    .then((users)=>{ 
      if(users){
        users.map((user)=>{ 
        ImageModel.find({$or:[{userName:user.sender},{userName:user.reciever}]}).sort({date:-1})
          .then( user=>{ 
            if(user){
                res.json(user)
            } else { 
              res.json({error:"error"}) 
            }
          }).catch(err=>console.log(err)); 
        });
      } else { 
        res.json({error:"error"}); 
      }
      
    })
    .catch(err=>res.json({error:"error"}));
  });
app.post("/profileimages",(req,res)=>{ 
    const uname=req.body.userName; 
    profileImages.findOne({userName:uname}).sort({date:-1}).then(image=>{
        if(image){
            res.json(image);
        }
        else{
            res.json({imageName:"none"});
        }
    }).catch(error=>console.log(error));
});
app.post("/update",(req,res)=>{
    let userName=req.body.userName;
    let whatToBeChange=req.body.whatToBeChage
    let change=req.body.change
    console.log(whatToBeChange);
    switch(whatToBeChange){
        case  "firstName":
            UsersModel.updateOne({userName:userName},{firstName:change}).then().catch(error=>console.log(error))
            break;
        case  "lastName":
            UsersModel.updateOne({userName:userName},{lastName:change}).then().catch(error=>console.log(error))
            res.end();
            break;
        case  "userName":
            UsersModel.updateOne({userName:userName},{userName:change}).then().catch(error=>console.log(error))
            res.end();
            break;
        case  "password":
            UsersModel.updateOne({userName:userName},{password:change}).then().catch(error=>console.log(error))
            res.end();
            break;
        case  "email":
            UsersModel.updateOne({userName:userName},{email:change}).then().catch(error=>console.log(error))
            res.end();
            break;
        case  "phoneNumber":
            UsersModel.updateOne({userName:userName},{phoneNumber:change}).then().catch(error=>console.log(error))
            res.end();
            break;
    }
})

module.exports=app;