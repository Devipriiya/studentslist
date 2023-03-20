import mongoose from "mongoose";
const teachersSchema=mongoose.Schema(
    {
    name:{
        type:String,
        required:true,
        },
    id:{
         type:String,
        required:true,
     },
                    
            
           
     })
const Teachers=mongoose.model("Teachers",teachersSchema);
export default Teachers;



