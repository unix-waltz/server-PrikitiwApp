import { PrismaClient } from '@prisma/client'
import _ from 'lodash'
import {response}from "../Utility/response.utils.js"
const {isNil,toInteger} = _
const prisma = new PrismaClient()
const Controller = {
Create : async (req,res) =>{
    const thumbnail = req.file ? req.file.path : null
    const {title,authorId,description,category} = req.body
    if(isNil(title)||isNil(authorId)) return response({res,status:"failed!",message:"Tittle & AuthorID must be filled!",code:500})
   try {
     const post = await prisma.post.create({
        data:{
            title,
            thumbnail,
            description,
            category,
            author:{
                connect:{id:toInteger(authorId)}
            }
        }
     })
     return response({res,data:post})
   } catch (error) {
    return response({
        res,
        status : 'Internal error!',
        code : 500,
        message:`${error}`
    })
   }
},
Update : async (req,res) =>{
    return res.send("up")
},
Delete : async (req,res) =>{
    return res.send("del")
},
}
export default Controller