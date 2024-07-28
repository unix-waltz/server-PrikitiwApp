import "dotenv/config"
import express from "express"
import routes from "./apps/Routes/root.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

app.use(
    cors({
      credentials: true,
      // origin: "https://client-prikitiw-app.vercel.app",
      origin: "http://127.0.0.1:5173/",
    })
  );
app.use(express.json())
app.use(express.static('./public'));
app.use(cookieParser())
app.get('/',(req,res)=> res.send('server running'))
app.use('/api',routes)
const port = process.env.APP_PORT || 4000
app.listen(port,()=> console.log(`Listen : ${port}`))
