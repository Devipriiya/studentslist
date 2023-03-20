import express from 'express';
const app=express();

app.use(express.json());
app.set("view engine","ejs");

app.use(express.static("public"));
app.get("/",(req,res)=>{
res.render("data");
})
app.get("/download-file",(req,res)=>{
    res.download("./book/book1.pdf");
})
app.listen(3000,()=>{
    console.log('server started on 3000');
});