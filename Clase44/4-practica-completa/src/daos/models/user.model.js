import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: {
        type:String,
        default:""
    },
    last_name: {
        type:String,
        default:""
    },
    email: {
        type: String,
        unique:true,
        required:true
    },
    age:{
        type:Number,
        default:null
    },
    password: {
        type:String,
        required:true
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"carts",
    },
    rol: {
        type: String,
        required:true,
        enum:["usuario","admin","premium"],
        default: 'usuario',
    },
    documents:{
        type:[
            {
                name: { type:String,required:true },
                reference: { type:String, required:true }
            }
        ],
        default:[]
    },
    last_connection:{
        type: Date, //new Date("año-mes-dia")
        default: null
    },
    status:{
        type:String,
        required:true,
        enum:["completo","incompleto","pendiente"],
        default:"pendiente"
    },
    avatar:{
        type:String,
        default:''
    }
});

export const UserModel = mongoose.model(userCollection, userSchema);