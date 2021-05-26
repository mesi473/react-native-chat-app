const mongodb=require('mongoose');

module.exports=FreindRequests=mongodb.model("freindRequests",mongodb.Schema({
    sender:String,
    reciever:String,
    acceptance:String
}));