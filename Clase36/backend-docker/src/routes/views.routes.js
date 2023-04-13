import { Router } from "express";
import {UserModel} from "../models/user.js";

const router = Router();

router.get('/',(req,res)=>{
    res.render('home');
});

router.get('/users', async (req,res)=>{
    const users = await UserModel.find().lean();
    res.render('users',{users});
});

export {router as viewRouter}