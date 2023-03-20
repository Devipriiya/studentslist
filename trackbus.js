import express from "express";
// import connectDB from "./librarydb.js";
import mongoose from "mongoose";
const router = express.Router();
Trackbus
// connectDB();
const app=express();
app.use(express.json());
var tracking=[
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

const trackbus={

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
   },
   {
    name:"Kumaresan",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
   },{
    name:"Joys",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
   },{
    name:"Devipriya",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
   },{
    name:"Megha",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
   },{
    name:"Aswini",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
   },{
    name:"Radhika",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
   },{
    name:"Ram",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
   },{
    name:"Harishankar",
    standard:"10th std",
    AtHome:"04:07 PM",
    Bording:"04:07 PM",
    AtSchool:"04:07 PM",
    Debording:"04:07 PM",
   }

]

}

const trackbusSchema=mongoose.Schema(
    {
        busname:{
            type:String,
          
        },            
        busnumber:{
            type:String,
          
        },            
       lastmovement:{
        type:String,
     
    },            
       enginecondition:{
        type:String,
      
    },            
       location:{
        type:String,
       
    },            
       kilometer:{
        type:String,
       
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
 
 var Trackbus= mongoose.model('trackbus',trackbusSchema);
 trackbusSchema.plugin(Trackbus);

 
router.get('/',(req,res) =>
{
    try{
        res.status(200).send(trackbus);
    }
    catch(error){
        res.json({message:"not available"});
    }
});
router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Trackbus.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            trackbus:result
            
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
        const trackbus={
    busname:req.body.busname,
    busnumber:req.body.busnumber,
    lastmovement:req.body.lastmovement,
    enginecondition:req.body.enginecondition,
    location:req.body.location,
    kilometer:req.body.kilometer,
    BusS57:req.body.BusS57
           
        }
        console.log(trackbus);
        var create=new Trackbus(trackbus);
        var trackbusCreated=await create.save();
      
        if(trackbusCreated){
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
    Trackbus.findOneAndUpdate({_id:req.params.id},{
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
            updated_trackbus:result       
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
        Trackbus.deleteOne({_id:req.params.id},{
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
                deleted_trackbus:result       
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
    
            Trackbus.deleteMany({trackbus},(err,result)=>{
            if(err) throw err
            res.send(trackbus)
            })
        })
        export default router;
// const port=4000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
//     console.log(tracking);
//     console.log(trackbus);

// });