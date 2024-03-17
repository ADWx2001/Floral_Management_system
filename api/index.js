import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import productRoute from "./routes/products.route.js"
import  orderRoute from "./routes/order.route.js" 
import cookieParser from "cookie-parser";
//import productRoute from "./routes/product.route.js"
// test import products api Prducts.js
import product from "./utils/Product.js";

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB')
}).catch((err)=>{
    console.log(err)
});

const app = express();
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173',
  };

app.use(cors(corsOptions));

app.listen(3000 ,() =>{
    console.log('Server Listning on port 3000')
});

app.use("/api/user",userRoute); 
app.use("/api/auth",authRoute);
app.use("/api/products",productRoute);
//app.use("/api/products",productRoute)
app.use("api/order",orderRoute);

// test product route
app.get("/products", (req, res) =>{
    res.send(product);
})


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    });
})
