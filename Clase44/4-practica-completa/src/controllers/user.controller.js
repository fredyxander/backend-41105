import {userService} from "../daos/repository/index.js";
import {UsuarioRole, PremiumRole} from "../constants/api.js";

class UserController{
    static async modifyUser(req,res){
        try {
            const userId = req.params.uid;
            //Verificamos si el usuario existe en la db
            const user = await userService.getUserById(userId);
            //valiamos el status del usuario
            if(user.documents<3 || user.status !=="completo"){
                return res.json({status:"error", message:"el usuario no ha sudibo todos los documentos"});
            }
            //obtenemos el actual rol del usuario
            const userRole = user.rol;
            //validamos el rol actual y cambiamos el rol del usuario
            if(userRole === UsuarioRole){
                user.rol = PremiumRole;
            } else if(userRole === PremiumRole) {
                user.rol = UsuarioRole;
            } else {
                return res.json({status:"error", message:"No es posible cambiar el rol de un administrador"});
            }
            await userService.updateUser(userId,user);
            res.json({status:"success", message:`nuevo rol del usuario: ${user.rol}`});
        } catch (error) {
            res.status(400).json({status:"error",message:error.message});
        }
    };


    static async uploadDocuments(req,res){
        try {
            const userId = req.params.uid;
            const user = await userService.getUserById(userId);
            // console.log(user);
            // console.log(req.files);
            const identificacion = req.files['identificacion']?.[0] || null;
            const domicilio = req.files['domicilio']?.[0] || null;
            const estadoDeCuenta = req.files['estadoDeCuenta']?.[0] || null;
            const docs = [];
            if(identificacion){
                docs.push({
                    name:'identificacion',
                    reference:identificacion.path
                })
            }
            if(domicilio){
                docs.push({
                    name:'domicilio',
                    reference:domicilio.path
                })
            }
            if(estadoDeCuenta){
                docs.push({
                    name:'estadoDeCuenta',
                    reference:estadoDeCuenta.path
                })
            }
            user.documents = docs;
            if(docs.length === 3){
                user.status = "completo"
            } else {
                user.status = "incompleto"
            }
            const userUpdated = await userService.updateUser(user._id,user);
            res.json({status:"success", message:`documentos actualizados: ${userUpdated}`});
        } catch (error) {
            res.status(400).json({status:"error",message:error.message});
        }
    }
}

export {UserController}