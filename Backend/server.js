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
const equipmentRoutes=require('./routes/equipments');
const reservationRoutes=require('./routes/reservations');
//app middleware
app.use(bodyParser.json());
app.use(cors()); //this is using for avoiding the security reason block.reason is react run on localhost 3000 and backend part run on localhost 8000.so,block that site from the server
//route middleware
app.use(postRoutes);
app.use(reviewRoutes);
app.use(applyRoutes);
app.use(eventRoutes);
app.use(equipmentRoutes);
app.use(reservationRoutes);

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