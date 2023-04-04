import express from "express";
import { addLogger } from "./utils/logger.js";

const app =express();
const port = 8080;

app.use(addLogger);

app.listen(port,()=>console.log(`Server on port ${port}`));

app.get("/",(req,res)=>{
    // console.log("ruta solicitada");
    req.logger.info("ruta solicitada");
    req.logger.debug("mensaje de prueba ignorado");
    req.logger.error("mensaje de error");
    res.send("Utilizando logger");
});

app.get("/suma",(req,res)=>{
    const {num1,num2}=req.query;
    if(!num1 || !num2){
        req.logger.error("Los numeros no son validos");
    }
    req.logger.info("numeros validos");
    res.send("Suma procesada");
});