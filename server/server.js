const express =require('express');
const cors=require('cors');
const mongoose =require('mongoose');
const empRouter=require('./routes/employees');

const app=express();
app.use(cors());
app.use(express.json());
const  PORT =5000;
const MONGO_URI='mongodb://localhost:27017/Employees';

mongoose.connect(MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('COnnected MongoDB'))
.catch(err=>{
    console.error('Mongo Error',err);
    process.exit(1);
});

app.use('/api/employees',empRouter);

app.get('/',(req,res)=>res.send('API Running'));

app.listen(PORT,()=>console.log('Server running'));