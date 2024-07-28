import { Router } from "express";
import Controller from "../Controllers/auth.controller.js";
const route = Router()
route.post('/login',Controller.Login)
route.delete('/logout',Controller.Logout)
route.post('/register',Controller.Register)
route.post('/refresh',Controller.Refresh)
route.post('/init',Controller.Initial)
export default route