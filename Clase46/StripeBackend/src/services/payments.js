import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

export class PaymentService{
    constructor(){
        //inicializamos stripe
        this.stripe = new Stripe(process.env.STRIPE_KEY);
    }

    async createPayment(data){
        const paymentIntent = this.stripe.paymentIntents.create(data);
        return paymentIntent;
    }
}