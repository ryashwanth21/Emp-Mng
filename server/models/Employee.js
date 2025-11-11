// In models we create schema using mangoose andreturn (export model)

const mongoose =require('mongoose')


const employeeSchema=new mongoose.Schema({
    EmployeeName:{type:String,required:true},
    EmployeeID:{type:String,unique:true,required:true,index:true},
    Designation:{type:String,required:true},
    Department:{type:String,required:true},
    JoiningDate:{type:Date,required:true}

},{timestamps:true});
module.exports=mongoose.model('Employee',employeeSchema);