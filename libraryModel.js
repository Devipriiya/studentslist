import mongoose from "mongoose";
const librarySchema=mongoose.Schema(
    {
        collections:[{
    bookname:{
        type:String,
       
        },
    category:{
         type:String,
      
     },
     authorname:{
        type:String,
      
    },               
}]         
           
     })
const Library=mongoose.model("Library",librarySchema);
export default Library;