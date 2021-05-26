const mongoose =require('mongoose')

const ProfileImage=mongoose.Schema({
    imageName:{
        type:String,
        default:"none",
        required:true
    },
    userName:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    }
});

module.exports=ImageModle=mongoose.model('profileimages',ProfileImage);