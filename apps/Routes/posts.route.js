import Controller from "../Controllers/posts.controller.js";
import upload from "../Config/multer.config.js"
import { Router } from "express";
const route = Router()
route.post('/create',upload.single('thumnail'),Controller.Create)
route.delete('/delete',Controller.Delete)
route.post('/update',Controller.Update)
export default route
