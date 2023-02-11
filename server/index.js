import express from "express";
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import cookieParser from 'cookie-parser';
import multer from "multer"
import cors from "cors";

const app = express()




 
  




app.use(cookieParser())
const corsOptions ={
    
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));





app.use(express.json())
app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoutes)

app.listen(8000, () => {
    console.log("Connected")
})