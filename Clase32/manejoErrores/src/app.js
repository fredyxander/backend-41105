import express from "express";
import { UserRouter } from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = 8080;

const app = express();
app.use(express.json());

app.listen(PORT,()=>console.log(`Server lsitening on port ${PORT}`));

app.use("/api/users",UserRouter);
app.use(errorHandler);