const express=require('express')
const app=express()

const mongoose=require('mongoose')
const Usermodal=require('./models/Users')
const cors = require("cors");

const MONGOURL=require('./config/keys')

app.use(express.json());
app.use(cors());

mongoose.connect(MONGOURL)

app.get('/getusers',(req,res)=>{
    Usermodal.find({},(err,result)=>{

        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    })

})


app.post("/createuser",async(req,res)=>{
    const user=req.body
    const newuser=new Usermodal(user)
    await newuser.save()
  res.json(user)
})





if(process.env.NODE_ENV=='production'){
    const path=require('path')
    app.get("/",(req,res)=>{
        app.use(express.static(path.resolve(__dirname,'client','build','index.html')))
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })


}
app.listen(3001,()=>{
    console.log("server connected")
})