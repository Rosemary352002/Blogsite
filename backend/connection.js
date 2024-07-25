const mongoose =require('mongoose');
//connect to mongodb
mongoose.connect("mongodb+srv://rosemaryantony285:rose@cluster0.l9mjson.mongodb.net/Blogsite?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("connected to db")
    })
    .catch((error)=>{
        console.log(error)
    })