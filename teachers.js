import express from "express";
// import connectDB from "./teachersdb.js";
import mongoose from "mongoose";
const router = express.Router();
const teachersSchema=mongoose.Schema(
    {
        teacherslist:[{
    name:{
        type:String,
     
        },
    id:{
         type:String,
        
     },
    }]                  
            
           
     })

var Teachers = mongoose.model('Teachers', teachersSchema);
teachersSchema.plugin(Teachers);


// connectDB();
const app=express();
app.use(express.json());

const teachers={
 teacherslist:[   {
    name:"Damodaran",
    id:"101",
},
{
    name:"aswini",
    id:"102",
},
{
    name:"rathiga",
    id:"103",
},
{
    name:"megha",
    id:"104",
},
{
    name:"hari",
    id:"105",
},
{
    name:"vinodhini",
    id:"106",
},
{
    name:"pavithra",
    id:"107",
},
{
    name:"priya",
    id:"108",
},
]
}


router.get('/',(req,res) =>
{
    try{
        res.status(200).send(teachers);
    }
    catch(error){
        res.json({message:"not available"});
    }
});


router.get('/:id',(req,res)=>{
    console.log(req.params.id);
   Teachers.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            teachers:result
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
router.post('/',async(req,res)=>{
    try{
        const teachers={
      teacherslist:req.body.teacherslist
           
        }
        console.log(teachers);
        var create=new Teachers(teachers);
        var teachersCreated=await create.save();
      
        if(teachersCreated){
            console.log("created");
        res.status(201).json({message:"show details"});
        }
else{
    res.status(401);
    throw new error("not found");
}
}catch(err){
    return res.status(500).json({message:err.message});
}}
);
router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Teachers.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            teacherslist:req.body.teacherslist

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_teachers:result       
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
        Teachers.deleteOne({_id:req.params.id},{
            $set:{
               
                teacherslist:req.body.teacherslist
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_teachers:result       
             })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        })
        app.delete('/',(req,res)=>{
    
            Teachers.deleteMany({teachers},(err,result)=>{
            if(err) throw err
            res.send(teachers)
            })
        })
        export default router;
// const port=3000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
//     console.log(teachers);
// });