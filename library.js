import express from "express";
// import connectDB from "./librarydb.js";
import Library from "./libraryModel.js";
const router =express.Router();
// connectDB();
Library
const app=express();
app.use(express.json());

const library={
collections:[
    {
    bookname:"Bluebook",
    category:"Grammer",
    authorname:"steephan"
},
{
    bookname:"planatation",
    category:"science",
    authorname:"josh evans"
},
{
    bookname:"the key of success",
    category:"story",
    authorname:"jerry clifford"
},
{
    bookname:"Discovery of India",
    category:"history",
    authorname:"josh evans"
},
{
    bookname:"The magic mango",
    category:"picture book",
    authorname:"josh evans"
},
{
    bookname:"Word power made easy",
    category:"vocabulary",
    authorname:"Norman lewis"
},
{
    bookname:"Believe in Yourself",
    category:"biography",
    authorname:"josheph murphy"
},
{
    bookname:"polynomials",
    category:"mathematics",
    authorname:"josh evans"
}
]
}

app.set("view engine","ejs");

app.use(express.static("public"));
router.get('/data',(req,res)=>{
res.render("data");
})
router.get('/download-file',(req,res)=>{
    res.download("./book/Nodejs contents 1.pdf");
})
router.get('/',(req,res) =>
{
    try{
        res.status(200).send(library);
    }
    catch(error){
        res.json({message:"not available"});
    }
});

router.get('/:id',(req,res)=>{
    console.log(req.params.id);
  Library.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            library:result
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
        const library={
          collections:req.body.collections
           
        }
        console.log(library);
        var create=new Library(library);
        var libraryCreated=await create.save();
      
        if(libraryCreated){
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
    Library.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            collections:req.body.collections
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_library:result       
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
        Library.deleteOne({_id:req.params.id},{
            $set:{
               
                collections:req.body.collections
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_library:result       
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
    
            Library.deleteMany({library},(err,result)=>{
            if(err) throw err
            res.send(library)
            })
        })

        export default router;
// const port=4000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
//     console.log(library);
// });