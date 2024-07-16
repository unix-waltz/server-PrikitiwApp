import Controller from "../Controllers/guest.controller.js";
import { Router } from "express";
const route = Router()
route.get('/index',Controller.Index)
route.get('/detail/:id',Controller.getSinglepost)
export default route