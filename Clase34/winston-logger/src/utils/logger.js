import winston from "winston";

const logger = winston.createLogger({
    transports:[
        //definir los sistemas de almacenamiento
        new winston.transports.Console({ level:"http" }),
        new winston.transports.File({filename:"./logs/errores.log", level:"warn"})
    ]
});

//creamos un middleware para gregare el logger al objeto req
export const addLogger = (req,res,next)=>{
    req.logger=logger;
    req.logger.http(`${req.url}- ${req.method}`);
    next();
};