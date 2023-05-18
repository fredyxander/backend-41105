import { Router, json } from "express";
import { PaymentService } from "../services/payments.js";

const router = Router();

const mockCart = [
    { id: 1, name: "papas", price: 1000 },
    { id: 2, name: "queso", price: 500 },
    { id: 3, name: "hamburguesa", price: 1500 },
    { id: 4, name: "soda", price: 1000 },
    { id: 5, name: "golosinas", price: 800 }
];

router.post("/payment-intents",async(req,res)=>{
    try {
        const productId = parseInt(req.query.id);
        const product = mockCart.find(prod=>prod.id === productId);
        if(!product){
            return res.status(404).json({status:"error", error:"el producto no se encontro"});
        }
        //generar la informacion de la compra par enviar al servicio stripe
        const paymentInfo = {
            amount:product.price,
            currency:"usd",
            metadata:{
                userId:"hgasd#@#SD#$$%sdf234234sd",
                orderDetails:JSON.stringify({
                    name:product.name,
                    quantiy:5
                },null,2),
                address:JSON.stringify({
                    city:"Bogota",
                    zip:762131,
                    number:189
                },null,2)
            }
        }
        const service = new PaymentService();
        const result = await service.createPayment(paymentInfo);
        console.log("result", result);
        res.json({status:"success", payload:result});
    } catch (error) {
        console.log(error.message);
        req.send("hubo un error")
    }
});

export { router as paymentRouter}