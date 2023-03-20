import express from "express";
// import connectDB from "./librarydb.js";
import mongoose from "mongoose";

const router =express.Router();
// connectDB();
const app=express();
app.use(express.json());

const upcommingexam=
{
    examname:"Annual Exam",
   time:"10.00AM to 12.30PM",
   date:"1/3/2023 to 10/3/2023",
   total_mark:100,
   passing_mark:35,
    viewtimetable:[{
    date:"1/3/2023",
    subject:"Language 1",
    syllabus:"5 units"
    
   }]
  
}
const examresult={
    examname:"1st mid-term",
      grade:"pass",
      totalmark:"345/500",
    subject: "Language 1" ,
    mark:"80",
    grade:"pass",
   remarks:"Good at scoring marks games and behaviour"
}
const upcommingexamSchema=mongoose.Schema(
    {
        examname:{
            type:String,
         
        },            
        time:{
            type:String,
        },            
        date:{
        type:String,
    },            
    total_mark:{
        type:String,
      
    },            
    passing_mark:{
        type:String,
      
    },            
             
    viewtimetable:[{
        date:{
    type:String},
    subject:{
    type:String
} ,
syllabus:{
    type:String
},

}]
})
 
 var Upcommingexam = mongoose.model('upcommingexam', upcommingexamSchema);
 upcommingexamSchema.plugin(Upcommingexam);
 const examresultSchema=mongoose.Schema(     
    {
      examname:{
        type:String,
     
    },  
      grade:{
        type:String,
     
    },  
      totalmark:{
        type:String,
       
    },  
    subject:{
        type:String,
      
    },  
    mark:{
        type:String,
     
    },  
    grade:{
        type:String,
    },
   remarks:{
        type:String,
       
    },  
    },
    )
 var Examresult = mongoose.model('Examresult', examresultSchema);
 examresultSchema.plugin(Examresult);



router.get('/',(req,res) =>
{
    try{
        res.status(200).send(upcommingexam);
    }
    
    catch(error){
        res.json({message:"not available"});
    }
});
router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Subject.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
           upcommingexam:result
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
        const upcommingexam={
            examname:req.body.examname,
            time:req.body.time,
            date:req.body.date,
            total_mark:req.body.total_mark,
            passing_mark:req.body.passing_mark,
            viewtimetable:req.body.viewtimetable
           
        }
        console.log(upcommingexam);
        var create=new Upcommingexam(upcommingexam);
        var upcommingexamCreated=await create.save();
      
        if(upcommingexamCreated){
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
    Upcommingexam.findOneAndUpdate({_id:req.params.id},{
        $set:{
            examname:req.body.examname,
            time:req.body.time,
            date:req.body.date,
            total_mark:req.body.total_mark,
            passing_mark:req.body.passing_mark,
            viewtimetable:req.body.viewtimetable
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_upcommingexam:result       
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
        Upcommingexam.deleteOne({_id:req.params.id},{
            $set:{
                examname:req.body.examname,
                time:req.body.time,
                date:req.body.date,
                total_mark:req.body.total_mark,
                passing_mark:req.body.passing_mark,
                viewtimetable:req.body.viewtimetable
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_upcommingexam:result       
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
    
            Upcommingexam.deleteMany({upcommingexam},(err,result)=>{
            if(err) throw err
            res.send(upcommingexam)
            })
        })
        router.get('/exam',(req,res) =>
        {
            try{
                res.status(200).send(examresult);
            }
            catch(error){
                res.json({message:"not available"});
            }
        });
       router.get('/:id',(req,res)=>{
            console.log(req.params.id);
            Examresult.findById(req.params.id)
            
            .then(result=>{
                res.status(200).json({
                    examresult:result
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
                const examresult={
                    examname:req.body.examname,  
                      grade: req.body.grade,
                      totalmark: req.body.totalmark, 
                    subject: req.body.subject,
                    mark: req.body.mark,
                    grade:req.body.grade,
                   remarks:req.body.remarks,
                }
                console.log(examresult);
                var create=new Examresult(examresult);
                var examresultCreated=await create.save();
              
                if(examresultCreated){
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
        )
        router.put('/:id',(req,res)=>{
            console.log(req.params.id);
            Examresult.findOneAndUpdate({_id:req.params.id},{
                $set:{
                    examname:req.body.examname,  
                    grade: req.body.grade,
                    totalmark: req.body.totalmark, 
                  subject: req.body.subject,
                  mark: req.body.mark,
                  grade:req.body.grade,
                 remarks:req.body.remarks,
                }
            })
            .then(result=>{
                res.status(200).json({
                    updated_examresult:result       
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
                Examresult.deleteOne({_id:req.params.id},{
                    $set:{
                       
                        examname:req.body.examname,  
                        grade: req.body.grade,
                        totalmark: req.body.totalmark, 
                      subject: req.body.subject,
                      mark: req.body.mark,
                      grade:req.body.grade,
                     remarks:req.body.remarks,
            
                    }
                })
                .then(result=>{
                    res.status(200).json({
                        deleted_examresult:result       
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
            
                    Examresult.deleteMany({examresult},(err,result)=>{
                    if(err) throw err
                    res.send(examresult)
                    })
                })

                export default router;
        // const port=3000;
        // app.listen(port,()=>{
        //     console.log(`server is running at ${port}`);
        //     console.log(upcommingexam);
        //     console.log(examresult);
        // });