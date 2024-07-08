import { Router } from "express";
import authroute from "./auth.route.js"
import {useAuth} from "./../Middleware/auth.middleware.js"
import postsroute from "./posts.route.js";
const route = Router()
route.use('/auth',authroute)
// route.use('/profile',authroute)
route.use('/post',useAuth,postsroute)
export default route