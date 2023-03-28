import { Router } from "express";
import { CustomError } from "../services/error/customError.js";
import { EError } from "../enums/EError.js";
import { generateUserErrorInfo, generateUserErrorParam } from "../services/error/userErrorInfo.js";

const router = Router();

let users = [];

router.get("/",(req,res)=>{
    res.json({
        status:"success",
        data:users
    });
});

router.post("/",(req,res)=>{
    const {nombre,apellido,correo} = req.body;
    if(!nombre || !apellido || !correo){
        //generamos el error
        CustomError.createError({
            name:"User create error",
            cause: generateUserErrorInfo(req.body),
            message:"Error creating the new user",
            errorCode:EError.INVALID_TYPES
        });
    }
    const newUser = {
        id:users.length+1,
        nombre,
        apellido,
        correo,
    }
    users.push(newUser);
    res.json({
        status:"success",
        data:newUser
    });
})


router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const userId = parseInt(id);
    if(Number.isNaN(userId)){
        //generamos el error
        CustomError.createError({
            name:"Get User by id error",
            cause: generateUserErrorParam(id),
            message:"Error getting the user",
            errorCode:EError.INVALID_PARAM
        });
    }
    const userFound = users.find(user=>user.id === userId);
    res.json({status:"success", data:userFound});
})

export {router as UserRouter}