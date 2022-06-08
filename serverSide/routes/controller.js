const { json } = require('express');
const express=require('express');
const { findByIdAndRemove, findByIdAndUpdate } = require('../models/dataBaseStore');
const employeeDataBase=require('../models/dataBaseStore');
const route=express.Router();

route.get('/',(req,res)=>{
    console.log("the backend you write is working correctlly")
    res.status(200).json("we will send you the output")
})

route.post('/api/empoyee/read',(req,res)=>{
    console.log('the first api call is being runnig...')
    res.status(200).send('response is being send to the client')
});

//store the employee information to the mongose database
//CREATE
route.post('/employee/api/creat/employeeInfo',async(req,res)=>{
    //use the model to store the actual employee information
    const employeeData=new employeeDataBase({
        employeeName:req.body.uname,
        employeeBirth:req.body.udate,
        employeeGender:req.body.ugender,
        employeeSalary:req.body.usalary
    });

    //now i will use try and catch block if there is some problem 
    //these will help me to handle the errors before the app crashes
    try{
       await employeeData.save();
       console.log('saving the employee information is success');
       res.status(200).json({message:'Employee Data is being saved'});
    }catch(e){
       console.log('unable to store employee information due to '+e);
       res.status(300).json(e);
    }

});

//READ all the database information
route.get('/employee/api/read/employeeInfo',async(req,res)=>{
  //write try and catch block to handle the error   
    try{
        console.log('some kind of request is comming from the client side');

      const employeeList=await employeeDataBase.find();
      console.log(' reading employee list is succes');
      res.status(200).json(employeeList);
     }catch(e){
         console.log('error in reading employee lists due to '+e);
         res.status(300).json(e);
     }

});

//UPDATE employee information
route.put('/employee/api/update/employeeInfo/:id',async(req,res)=>{
    //get the specific employee information
    const getValues={        
        getNewName:req.body.newEmployeeName,
        getNewBirth:req.body.newEmployeeBirth,
        getNewGender:req.body.newEmployeeGender,
        getNewSalary:req.body.newEmployeeSalary

    };

  console.log(req.params.id);  

console.log('____________________________');
console.log(getValues.getNewName);
console.log(getValues.getNewBirth);
console.log(getValues.getNewGender);
console.log(getValues.getNewSalary);

    //now use try and catch block for error handling
    try{
                 
      const updatedData=await employeeDataBase.findByIdAndUpdate({_id:req.params.id},
                                                {employeeName:req.body.newEmployeeName,
                                                employeeBirth:req.body.newEmployeeBirth,
                                                employeeGender:req.body.newEmployeeGender,
                                                employeeSalary:req.body.newEmployeeSalary});
      console.log('employee updated sucessfully');
      res.status(200).send({message:'updated sucessfully'});        
                                                                                    
    }catch(e){
        console.log('error in updating employee information due to '+e);
        res.status(300).json(e);
    }
});

//DELETE employee infromation
route.delete('/employee/api/delete/employeeInfo/:id',async(req,res)=>{
    const getInfo=req.params.id;
    try{
      await employeeDataBase.findByIdAndRemove({_id:getInfo});
      console.log('deleteing the user information success');
      res.status(200).json('Employee has been removed sucesfully');
    }catch(e){
        console.log('unable to remove employee informtion due to '+e);
        res.status(300).json({message:'problemose removing employee'});
    }
});


module.exports=route;