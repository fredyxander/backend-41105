import express from "express";

const app = express();

app.listen(8080,()=>console.log("server ok"));

app.get("/sencilla",(req,res)=>{
    let sum=0;
    for(let i=0;i<1000000;i++){
        sum +=i;
    }
    res.send(`la suma es ${sum}`);
});

app.get("/compleja",(req,res)=>{
    let sum=0;
    for(let i=0;i<5e8;i++){
        sum +=i;
    }
    res.send(`la suma es ${sum}`);
});