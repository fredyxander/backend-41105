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
    res.send("Utiliznado logger");
});

app.get("/login",(req,res)=>{
    req.logger.warn("mensaje de advertencia, el usuario no existe");
    res.send("login autorizado");
});