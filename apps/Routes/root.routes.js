import { Router } from "express";
import authroute from "./auth.route.js"
const route = Router()
route.use('/auth',authroute)
export default route