import express from "express";

const app = express();
const port = 8080;

app.listen(port,()=>console.log(`Servidor corriendo en el puerto ${port} en el proceso ${process.pid}`));

app.get("/",(req,res)=>{
    res.send("hola docker");
});

app.get("/sencilla",(req,res)=>{
    let sum=0;
    for(let i=0;i<10000;i++){
        sum+=i;
    }
    console.log(`El proceso ${process.pid} respondio esta solicitud, el valor de la suma es ${sum}`);
    res.send({sum})
});

app.get("/compleja",(req,res)=>{
    let sum=0;
    for(let i=0;i<5e8;i++){
        sum+=i;
    }
    console.log(`El proceso ${process.pid} respondio esta solicitud, el valor de la suma es ${sum}`);
    res.send({sum});
});