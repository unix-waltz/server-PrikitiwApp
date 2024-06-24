import "dotenv/config"
import express from "express"
import routes from "./Routes/root.routes.js"
const app = express()
app.use(express.json())

app.use('/api',routes)
const port = process.env.APP_PORT || 4000
app.listen(port,()=> console.log(`Listen : ${port}`))
