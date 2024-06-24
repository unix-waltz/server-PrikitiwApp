import { Router } from "express";
import authroute from "./auth.route.js"
const route = Router()
route.use(authroute)
export default route