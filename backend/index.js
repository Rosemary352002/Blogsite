var express=require('express')
var cors=require('cors')
require('./connection');
const user=require('./model/user');
const userblog=require('./model/userblog');
var app=express();
app.use(express.json()); //enabling json format by express
app.use(cors());

//api for posting users
app.post('/add',async(req,res)=>{
    try{
        console.log(req.body);
        await user(req.body).save();
        res.send({message:"data added sucessfully"})
   }catch(error){
       console.log(error)
   }
})
//api for getting users
app.get('/view',async(req,res)=>{
    try {
        const {Email} = req.query
        var data = await user.findOne({Email})
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send('Invalid email id or password\n' + error)
    }
})
//api for posting blogs
app.post('/addbg', async(req,res) => {
    try {
        await userblog(req.body).save()
        res.send({message:"Blog submitted sucessfully"})
        console.log("blog saved") 
    } catch (error) {
        console.log(error)
        res.send('Blog not saved\n' + error)
    }
})
//api for getting blogs
app.get('/viewbg', async(req,res) => {
    try {
        var data = await userblog.find()
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send('Data not found\n' + error)
    }
})
//api for getting currentuser blogs
app.get('/viewbguser', async(req,res) => {
    try {
        const {Email} = req.query
        var data = await userblog.find({Email})
        res.json(data)
    } catch (error) {
        console.log(error)
        res.send('Data not found\n' + error)
    }
})
//api for deleting blogs
app.delete('/remove/:id',async(req,res)=>{
    try {
        
        await userblog.findByIdAndDelete(req.params.id);
        res.send({message:"deleted"})
    } catch (error) {
        console.log(error);
    }
})
//api for updating blogs
app.put('/edit/:id',async(req,res)=>{
    try{
    var data=await userblog.findByIdAndUpdate(req.params.id,req.body);
    res.send({message:"updated succesfully",data})
    }
    catch(error){
        console.log(error);
    }
})

//api for getting users for admin
app.get('/getuser', async(req,res) => {
    try {
        var data = await user.find()
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send('Data not found\n' + error)
    }
})

// api for deleting users by admin

app.delete('/deleteuser/:id', async(req,res) => {
    try {
        await user.findByIdAndDelete(req.params.id)
        res.send('User deleted')
    }
    catch (error) {
        console.log(error)
        res.send('User not deleted\n' + error)
    }
})
app.listen(3040,()=>{
    console.log("port is up and running")
})