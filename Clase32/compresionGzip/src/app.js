import express from "express";
import compression from "express-compression";

const PORT =8080;
const app = express();

app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`));

app.get("/peticionNormal",(req,res)=>{
    res.send("palabra".repeat(200000));
});

app.get("/peticionGzip", compression(), (req,res)=>{
    res.send("palabra".repeat(200000));
});

app.get("/hola",(req,res)=>{
    res.json({name:"pepe",age:20})
})