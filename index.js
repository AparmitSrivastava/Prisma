import express from "express"

const app = express();

app.get("/", (req,res)=>{
    res.json({message:"Welcome Brother!"})
    
})

app.listen(3000, ()=>{
    console.log(`Server is running on Port: 3000`);
})