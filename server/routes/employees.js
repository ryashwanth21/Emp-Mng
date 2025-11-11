const express=require('express');
const router=express.Router();
const Employee=require('../models/Employee');
router.get('/',async (req,res)=>{
    try{
        const allemp=await Employee.find();
        res.status(200).json(allemp);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err,message:'Server Error'});
    }
});
router.get('/search/:id',async (req,res)=>{
    try{
        const emp=await Employee.findOne({EmployeeID:req.params.id});
        if(!emp) return res.status(404).json({message:'Employee not found'});
        res.json(emp)

    }
    catch(err){
        console.error(err);
        res.status(500).json({error:err.message});

    }
});
router.post('/add',async (req,res)=>{
    try{
        const {EmployeeName,EmployeeID,Designation,Department,JoiningDate}=req.body;
        if(!EmployeeName||!EmployeeID || !Designation ||!Department || !JoiningDate){
            return res.status(400).json({error:'ALl feilds req'});
        }
        const emp=new Employee({
            EmployeeName,
            EmployeeID,
            Designation,
            Department,
            JoiningDate : new Date(JoiningDate)
        });
        await emp.save();
        res.status(201).json({message:'Added employee',employee:emp});

    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'Server Error'});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deleted = await Employee.findOneAndDelete({ EmployeeID: req.params.id });
        if (!deleted) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted', employee: deleted });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});




router.put('/update/:id', async (req, res) => {
    try {
        const emp=await Employee.findOne({EmployeeID:req.params.id});
        emp.Designation=req.body.Designation;
        emp.EmployeeName=req.body.EmployeeName;
        emp.Department=req.body.Department;
        emp.JoiningDate=req.body.JoiningDate;
        await emp.save();

        res.status(200).json({ message: 'Data updated', employee: emp });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});



module.exports=router;