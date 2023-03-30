import express from "express";
import {sumar,restar, multiplicar,dividir} from "libreria-operaciones-coder";

const PORT=8080;
const app = express();

app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`));

app.get("/sumar",(req,res)=>{
    const {num1,num2}=req.query;
    const resultado = sumar(parseInt(num1),parseInt(num2));
    res.json({response:resultado});
});