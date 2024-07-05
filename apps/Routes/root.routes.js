import { Router } from "express";
import authroute from "./auth.route.js"
import postsroute from "./posts.route.js";
const route = Router()
route.use('/auth',authroute)
// route.use('/profile',authroute)
route.use('/post',postsroute)
export default route