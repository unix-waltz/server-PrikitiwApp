import Controller from "../Controllers/guest.controller.js";
import { Router } from "express";
const route = Router()
route.get('/index',Controller.Index)
route.get('/all',Controller.AllPost)
route.get('/detail/:id',Controller.getSinglepost)
route.get('/category/:category',Controller.getCategory)
route.get('/author/:author',Controller.getAuthor)
export default route