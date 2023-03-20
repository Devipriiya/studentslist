import express from "express";
// import connectDB from "./librarydb.js";
import mongoose from "mongoose";
const router = express.Router();
// Bustrack
// connectDB();
const app=express();
app.use(express.json());
var trackbus=[
    {
        moving:12
    },
    {
        offset:7
    },
    {
       Decline:2
    },                   
]

const bustrack={

    busname:"Bus 5- Mini Bus",
    busnumber:"TN 23234",
   lastmovement:"2 min ago",
   enginecondition:"Engine On",
   location:"check location on map",
   kilometer:"0235 km/h",
    BusS57:[{
    // _id:"1",
    name:"Prashanth",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
    status:"present",
   },
   {
    name:"Kumaresan",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
    status:"present",
   },{
    name:"Joys",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
    status:"present",
   },{
    name:"Devipriya",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
    status:"present",
   },{
    name:"Megha",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
    status:"present",
   },{
    name:"Aswini",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
    status:"present",
   },{
    name:"Radhika",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
    status:"absent",
   },{
    name:"Ram",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
    status:"absent",
   },{
    name:"Harishankar",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
    status:"present",
   }

]

}

const bustrackSchema=mongoose.Schema(
    {
        busname:{
            type:String,
           required:true,
        },            
        busnumber:{
            type:String,
           required:true,
        },            
       lastmovement:{
        type:String,
       required:true,
    },            
       enginecondition:{
        type:String,
       required:true,
    },            
       location:{
        type:String,
       required:true,
    },            
       kilometer:{
        type:String,
       required:true,
    } ,        
    BusS57:[{
   name:{
    type:String},
    standard:{
    type:String
} ,
AtHome:{
    type:String
},
Bording:{
    type:String
},
AtSchool:{
    type:String
},
Debording:{
    type:String
},
}]
})
 
 var Bustrack = mongoose.model('Bustrack', bustrackSchema);
 bustrackSchema.plugin(Bustrack);

router.get('/',(req,res) =>
{
    try{
        res.status(200).send(bustrack);
    }
    catch(error){
        res.json({message:"not available"});
    }
});
router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Bustrack.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            bustrack:result
            
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
        const bustrack={
    busname:req.body.busname,
    busnumber:req.body.busnumber,
    lastmovement:req.body.lastmovement,
    enginecondition:req.body.enginecondition,
    location:req.body.location,
    kilometer:req.body.kilometer,
    BusS57:req.body.BusS57
           
        }
        console.log(bustrack);
        var create=new Bustrack(bustrack);
        var bustrackCreated=await create.save();
      
        if(bustrackCreated){
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
    Bustrack.findOneAndUpdate({_id:req.params.id},{
        $set:{
            busname:req.body.busname,
            busnumber:req.body.busnumber,
            lastmovement:req.body.lastmovement,
            enginecondition:req.body.enginecondition,
            location:req.body.location,
            kilometer:req.body.kilometer
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_bustrack:result       
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
        Bustrack.deleteOne({_id:req.params.id},{
            $set:{
               
                busname:req.body.busname,
                busnumber:req.body.busnumber,
               lastmovement:req.body.lastmovement,
               enginecondition:req.body.enginecondition,
               location:req.body.location,
               kilometer:req.body.kilometer
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_bustrack:result       
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
    
            Bustrack.deleteMany({bustrack},(err,result)=>{
            if(err) throw err
            res.send(bustrack);
            })
        })

        export default router;
// const port=4000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
//     console.log(trackbus);
//     console.log(bustrack);
// });