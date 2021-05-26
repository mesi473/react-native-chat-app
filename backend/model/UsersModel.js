const mongodb=require('mongoose');

const Users=mongodb.Schema({
    userName:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    phoneNumber:{
        type:String,
        require:true
    },
    profilePic:{
        type:String
    }
})


module.exports=UsersModel=mongodb.model('Users',Users);