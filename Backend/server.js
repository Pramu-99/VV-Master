const express = require('express');
const mongoose=require('mongoose');
const bodyParser =require('body-parser');
const cors=require('cors');

const app=express();

//import routes
const postRoutes=require('./routes/posts');
const reviewRoutes=require('./routes/review');
const applyRoutes=require('./routes/eventapplication');
const eventRoutes=require('./routes/event');

//app middleware
app.use(bodyParser.json());
app.use(cors()); 
//route middleware
app.use(postRoutes);
app.use(reviewRoutes);
app.use(applyRoutes);
app.use(eventRoutes);


const PORT=8000;
const DB_URL='mongodb+srv://MainAdmin:VVMaster44@vannivogue.u4bzovt.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_URL)
.then(()=>{
    console.log('DB connected');
})
.catch((err)=>console.log('DB connection error',err));


app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`);
});