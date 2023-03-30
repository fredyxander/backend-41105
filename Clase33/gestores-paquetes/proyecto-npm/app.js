import express from "express";

const PORT=8080;
const app = express();

app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`));

app.get("/",(req,res)=>{
    res.send("servidor node utilizando nvm cambio agregado")
});