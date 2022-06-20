const express = require('express')
const app = express()
const mongoose = require("mongoose");
const FriendModal=require('./models/Friends')

//DATABASE CONNECTION
mongoose.connect("mongodb://localhost:27017/mernSample?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    {useNewUrlParser: true}
);

//Writing To Database
app.get("/insert",async (req,res)=>{
    const friend=new FriendModal({name:"Sai",age:19});
    await friend.save();
    res.send("Data Successfully Inserted!!")
})

//Reading from database
app.get("/read",async (req,res)=>{
    FriendModal.find({},(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    });
})


app.listen(3001, () => {
    console.log("Connected Successfully!")
})
