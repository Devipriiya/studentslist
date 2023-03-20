import express from 'express';

const app = express();
import multer from "multer";
import path from "path";

const router =express.Router();

import ImageModel from './imagemodel.js';


const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
const image=[{
    name:"By Devipriya",
    image:{
        
data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
contentType:"image/png"
    }
},
{
 name:"By Aswini",
        image:{
            
    data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
    contentType:"image/png"
        
    }  
},
{
    name:"By rathiga",
    image:{
        
data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
contentType:"image/png"
    }
},
{
    name:"By megha",
    image:{
        
data:"https://cdn-icons-png.flaticon.com/512/257/257651.png",
contentType:"image/png"
    }
}
]
router.get('/',(req,res)=>{
    res.send(image);
})



router.get('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            ImageModel.findById({_id:req.params.id},{
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
          
            .then(result=>{
                res.status(200).json({
                   images:result
                })
            })
            .catch(err=> {
            console.log(err);
            res.status(505).json({
                error:err
            })
            }
          )
        }
    })
    
})

router.post('/',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage = new ImageModel({
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
            newImage.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})
router.put('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            ImageModel.findOneAndUpdate({_id:req.params.id},{
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
          
            .then(result=>{
                res.status(200).json({
                    updated_image:result       
                 })
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                })
            })
        
        }
    })
    
})
router.delete('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            ImageModel.deleteOne({_id:req.params.id},{
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
          
            .then(result=>{
                res.status(200).json({
                   deleted_image:result       
                 })
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                })
            })
        
        }
    })

    
})
export default router;

