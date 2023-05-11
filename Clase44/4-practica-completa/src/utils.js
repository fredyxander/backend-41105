import path from "path";
import {fileURLToPath} from 'url';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {options} from "./config/options.js";
import multer from "multer";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const isValidPassword=(user, password)=>{
    return bcrypt.compareSync(password, user.password);
};

export const generateEmailToken = (email, expireTime)=>{
    const token = jwt.sign({email}, options.server.tokenKey, {expiresIn:expireTime});
    return token;
};

export const verifyEmailToken=(token)=>{
    try {
        const info = jwt.verify(token, options.server.tokenKey);
        return info.email;
    } catch (error) {
        return null;
    }
};

const checkMandatoryField = (body)=>{
    const {first_name, email, password} = body;
    if(!first_name || !email || !password){
        return false;
    } else {
        return true
    }
};

const multerProfileFilter = (req,file,cb)=>{
    const valid = checkMandatoryField(req.body);
    if(!valid){
        cb(null, false);
    } else {
        cb(null, true);
    }
}

//configuración para subir las imagenes de los usuarios
const profileStorage = multer.diskStorage({
    //donde voy a guardar los archivos
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"/multer/users/img"))
    },
    // con que nombre vamos a guardar las imagenes de los usuarios
    filename: function(req,file,cb){
        cb(null,`${req.body.email}-perfil-${file.originalname}`)
    }
});
//creamos el uploader
export const uploadProfile = multer({storage:profileStorage, fileFilter:multerProfileFilter});



//configuracion para subir documentos de usuarios
const documentStorage = multer.diskStorage({
    //donde voy a guardar los archivos
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"/multer/users/documents"))
    },
    // con que nombre vamos a guardar los documentos de los usuarios
    filename: function(req,file,cb){
        cb(null,`${req.user.email}-documento-${file.originalname}`)
    }
});
//creamos el uploader
export const uploadDocument = multer({storage:documentStorage});


//configuración para subir las imagenes de los productos
const productStorage = multer.diskStorage({
    //donde voy a guardar los archivos
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"/multer/products/img"))
    },
    // con que nombre vamos a guardar las imagenes de los productos
    filename: function(req,file,cb){
        cb(null,`${req.body.code}-${file.originalname}`)
    }
});
//creamos el uploader
export const uploadProduct = multer({storage:productStorage});