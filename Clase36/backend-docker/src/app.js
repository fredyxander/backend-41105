import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import {viewRouter} from './routes/views.routes.js';
import {userRouter} from './routes/users.routes.js';
import mongoose from 'mongoose';
import {config} from './config/config.js';

const app = express();
const PORT = process.env.PORT||8080;
mongoose.connect(config.mongo.URL);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//configuracion handlebars
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

//rutas
app.use('/',viewRouter);
app.use('/api/users',userRouter);

app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`));