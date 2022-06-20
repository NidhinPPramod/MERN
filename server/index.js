const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose");
const FriendModal = require('./models/Friends')

app.use(express.json());
app.use(cors());

//DATABASE CONNECTION
mongoose.connect("mongodb://localhost:27017/mernSample?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    {useNewUrlParser: true}
);

//Writing To Database

// app.post("/insert",async (req,res)=>{
//     // const friend=new FriendModal({name:"Sai",age:19});
//     // await friend.save();
//     // res.send("Data Successfully Inserted!!")
// })

app.post("/addfriend", async (req, res) => {
    const name = req.body.name
    const age = req.body.age

    const friend=new FriendModal({name:name,age:age});
    await friend.save();
    res.send(friend)
})

//Reading from database
app.get("/read", async (req, res) => {
    FriendModal.find({}, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
})

//Updating values in database
app.put('/update',async (req,res)=>{
    const newAge=req.body.newAge
    const id=req.body.id

    try {
        await FriendModal.findById(id,(err,friendToUpdate)=>{
            friendToUpdate.age=Number(newAge);
            friendToUpdate.save()
        })
    }catch (err){
        console.log(err)
    }
    res.send("updated")
})

//Deleting from Database
app.delete('/delete/:id',async (req,res)=>{
    const id=req.params.id
    await FriendModal.findByIdAndRemove(id).exec()
    res.send("Deleted successfully")
})


app.listen(3001, () => {
    console.log("Connected Successfully!")
})
