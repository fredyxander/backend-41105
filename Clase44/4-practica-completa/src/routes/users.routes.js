import { Router } from "express";
import {AdminRole} from "../constants/api.js";
import { checkRoles,checkAuth } from "../middlewares/auth.js";
import { UserController } from "../controllers/user.controller.js";
import {uploadDocument} from "../utils.js";

const router = Router();

router.put("/premium/:uid", checkRoles([AdminRole]) , UserController.modifyUser);

router.put("/:uid/documents", checkAuth , uploadDocument.fields([
    {name:'identificacion', maxCount:1},
    {name:'domicilio', maxCount:1},
    {name:'estadoDeCuenta', maxCount:1},
]) , UserController.uploadDocuments)

export { router as userRouter}