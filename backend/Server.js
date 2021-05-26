const express=require('express');
const router=require('./routes/Routes');
const mongodb=require('mongoose');

const app=express();
const PORT=5000;

app.use(express.json());
app.use("/",router);
app.use(express.static("uploads"))

mongodb.connect('mongodb://localhost:27017/chatAppReactNative',{ useUnifiedTopology: true,useNewUrlParser: true }).then(
    console.log("our database is running on port 27017")
).catch((err)=>console.log('error is occured'+err));
mongodb.set('useFindAndModify', false);
app.listen(PORT,console.log(`server is running on port ${PORT}`));