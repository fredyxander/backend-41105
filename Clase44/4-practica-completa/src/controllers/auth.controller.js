import passport from "passport";
import { userService } from "../daos/repository/index.js";

class AuthController{
    static signupLocal = passport.authenticate("signupStrategy",{
        failureRedirect:"/api/sessions/failure-signup"
    });

    static redirectProducts(req,res){
        res.redirect("/products");
    };

    static async logoutUser(req,res){
        try {
            //obtenemos el usuario
            // console.log(req.user)
            const user = {...req.user._doc};
            user.last_connection = new Date();
            // console.log(user)
            await userService.updateUser(user._id, user);
            await req.session.destroy();
            res.json({status:"success", message:"sesion finalizada"});
        } catch (error) {
            console.log(error.message)
            res.json({status:"error", message:"no se pudo cerrar la sesión"});
        }
    }
}

export {AuthController}