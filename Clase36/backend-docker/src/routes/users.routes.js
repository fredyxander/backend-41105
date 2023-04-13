import { Router } from "express";
import {UserModel} from "../models/user.js";
import { faker } from "@faker-js/faker";

const router = Router();

router.post('/',async(req,res)=>{
    const { first_name, last_name, email, password} = req.body;
    if( !first_name || !last_name || !email || !password ) return res.status(400).send({ status:"error",error:"Campos imcompletos"});
    let newUser = {
        first_name,
        last_name,
        email,
        password
    }
    const userCreated = await UserModel.create(newUser);
    if(req.query.redirect){
        res.redirect('/')
    }else{
        res.send({status:"success",payload:userCreated._id})
    }
});

router.get('/test',(req,res)=>{
    const user ={
        first_name:faker.name.firstName(),
        last_name:faker.name.lastName(),
        email:faker.internet.email(),
        password:faker.internet.password()
    }
    res.send(user);
});

export {router as userRouter}