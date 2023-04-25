import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

//importacion para documentacion
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from './config/docConfig.js';

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect("Agregar RUTA DE LA BASE DE DATOS");

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/api/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpecs));

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
