import express from "express";
import cluster from "cluster";
import {cpus} from "os";

const app = express();
const port = 8080;

// console.log(cluster.isPrimary);
// if(cluster.isPrimary){
//     console.log(`Soy el proceso principal con el id ${process.pid}`);
//     cluster.fork();
// } else {
//     console.log(`Soy un proceso secundario con el id ${process.pid}`);
// }

// console.log(cpus());
const numeroDeNucleos = cpus().length;
// console.log(numeroDeNucleos);

if(cluster.isPrimary){
    console.log(`Soy el proceso principal con el id ${process.pid}`);
    for(let i=0;i<numeroDeNucleos;i++){
        //por cada nucleo creamos un proceso secundario (Nodo del cluster)
        cluster.fork();
    }

    cluster.on("exit",(worker)=>{
        console.log(`El proceso ${worker.process.pid} dejo de funcionar`);
        cluster.fork();//si algun node falla, creamos otro nodo que lo sustituya
    })
} else {
    console.log(`Soy un proceso secundario con el id ${process.pid}`);
    app.listen(port,()=>console.log(`Servidor corriendo en el puerto ${port} en el proceso ${process.pid}`));

    app.get("/",(req,res)=>{
        res.send("hola soy un cluster");
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
}
