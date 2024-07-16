import { Router } from "express";
import authroute from "./auth.route.js"
import guestroute from "./guest.route.js";
import {useAuth} from "./../Middleware/auth.middleware.js"
import postsroute from "./posts.route.js";
const route = Router()
route.use('/auth',authroute)
route.use('/guest',guestroute)
route.use('/post',useAuth,postsroute)
export default route