import winston from "winston";
import * as dotenv from "dotenv";
dotenv.config();

const currentEnv = process.env.NODE_ENV || "development";

const devLogger = winston.createLogger({
    transports:[
        //definir los sistemas de almacenamiento
        new winston.transports.Console({ level:"verbose" })
    ]
});

const prodLogger = winston.createLogger({
    transports:[
        //definir los sistemas de almacenamiento
        new winston.transports.Console({ level:"http" }),
        new winston.transports.File({filename:"./logs/errores.log", level:"warn"})
    ]
});

//creamos un middleware para gregare el logger al objeto req
export const addLogger = (req,res,next)=>{
    if(currentEnv === "development"){
        req.logger=devLogger;
    } else {
        req.logger=prodLogger;
    }
    req.logger.http(`${req.url}- ${req.method}`);
    next();
};