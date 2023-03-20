import mongoose from "mongoose";
const studentsSchema=mongoose.Schema(
    {
    name:{
        type:String,
        required:true,
        },
    rollno:{
         type:String,
        required:true,
     },
                    
            
           
     })
const Students=mongoose.model("Students",studentsSchema);
export default Students;