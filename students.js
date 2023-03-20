import express from "express";
import multer from "multer";
import mongoose from "mongoose";
// import connectDB from "./studentsdb.js";
const router =express.Router();
// connectDB();
// Students
const studentsSchema=mongoose.Schema(
    {
    studentslist:[{
        image:{
            data:String,
         contentType: String
        },
        name:{
        type:String,
       
        },
    rollno:{
         type:String,
      
     },
           }]          })

var Students = mongoose.model('Students', studentsSchema);
studentsSchema.plugin(Students);


const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
const students={
  studentslist:[ {
    image:{
        data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
contentType:"image/png"
    },
    name:"devipriya",
    rollno:"1"
},
{
    image:{
        data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
contentType:"image/png"
    },
    name:"rathiga",
    rollno:"2"
},
{
    image:{
        data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
contentType:"image/png"
    },
    name:"aswini",
    rollno:"3"
},
{
    image:{
        data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
contentType:"image/png"
    },
    name:"hari",
    rollno:"4"
},
{
    image:{
        data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
contentType:"image/png"
    },
    name:"megha",
    rollno:"5"
},
{
    image:{
        data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
contentType:"image/png"
    },
    name:"hemprashanth",
    rollno:"6"
},
{
    image:{
     data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
contentType:"image/png"
    },
    name:"Gowrishankar",
    rollno:"7"
},
{
    image:{
        data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
contentType:"image/png"
    },
    name:"naveen",
    rollno:"8"
},
]
}
// connectDB();
const app=express();
app.use(express.json());




router.get('/',(req,res) =>
{
    try{
        res.status(200).send(students);
    }
    catch(error){
        res.json({message:"not available"});
    }
});



router.get('/:id',(req,res)=>{
    console.log(req.params.id);
   Students.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            students:result
        })
    })
    .catch(err=> {
    console.log(err);
    res.status(505).json({
        error:err
    })
    }
  )
})

router.post('/',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage = new Students({
               studentslist:req.body.studentslist
            })
            newImage.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Students.findOneAndUpdate({_id:req.params.id},{
        $set:{
            studentslist:req.body.studentslist
          

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_students:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    router.delete('/:id',(req,res)=>{
        console.log(req.params.id);
        Students.deleteOne({_id:req.params.id},{
            $set:{
               
                studentslist:req.body.studentslist
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_students:result       
             })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        })
        router.delete('/',(req,res)=>{
    
            Students.deleteMany({students},(err,result)=>{
            if(err) throw err
            res.send(students)
            })
        })

        export default router;
        // const port=4000;
        // app.listen(port,()=>{
        //     console.log(`server is running at ${port}`);
        //     console.log(students);
        // });