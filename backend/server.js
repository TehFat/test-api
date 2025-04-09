import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from './config/db.js';
import ProductRoutes from './routes/product.route.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000

app.use(cors()); 
app.use(express.json()); // aliaows us to accept json data in the req.body

app.use("/api/products", ProductRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log('server started at http://localhost:' + PORT );
    
});
