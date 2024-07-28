import { PrismaClient } from '@prisma/client'
import _ from 'lodash'
import {existsSync,unlinkSync} from 'fs'

import {response}from "../Utility/response.utils.js"
const {isNil,toInteger} = _
const prisma = new PrismaClient()
const Controller = {
Create : async (req,res) =>{
    const thumbnail = req.file ? req.file.filename : null
    // console.log(thumbnail)
    const {title,authorId,body,category} = req.body
    if(isNil(title)||isNil(authorId)) return response({res,status:"failed!",message:"Tittle & AuthorID must be filled!",code:403})
   try {
     const post = await prisma.post.create({
        data:{
            title,
            thumbnail,
            body,
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
const {postId,postThumbnail,title,authorId,body,category} = req.body
try {
    if(isNil(title)||isNil(authorId)||isNil(postId)||isNil(body)||isNil(category)) return response({res,status:"failed!",message:"Tittle & AuthorID must be filled!",code:500})

    const post = await prisma.post.findUnique({where:{id:postId}})
    let thumbnail = postThumbnail
    if(post.thumbnail != postThumbnail){
        thumbnail = req.file ? req.file.filename : null
        let oldtuhumb = `./public/posts-image/${post.thumbnail}`
        if(existsSync(oldtuhumb)) unlinkSync(oldtuhumb)
    }
if(post.authorId != authorId) return response({res,code:403,message:"is forbidden!"})

    const post_ = await prisma.post.update({
        where:{id:postId},
        data:{
            title,
            thumbnail,
            body,
            category,
            author:{
                connect:{id:toInteger(authorId)}
            }
        }
     })
     return response({res,data:post_})
   } catch (error) {
    return response({
        res,
        status : 'Internal error!',
        code : 500,
        message:`${error}`
    })
   }
},
Delete : async (req,res) =>{
    // console.log(req.body)
   const {authorId,postId} = req.body
   if(isNil(authorId)||isNil(postId)) return response({res,status:"failed!",message:"PostId & AuthorID must be filled!",code:500})
   try {
    const post = await prisma.post.findUnique({where:{id:postId}})
if(post.authorId != authorId) return response({res,code:403,message:"is forbidden!"})

    let oldtuhumb = `./public/posts-image/${post.thumbnail}`
    if(existsSync(oldtuhumb)) unlinkSync(oldtuhumb)
await prisma.post.delete({where:{id:postId}})
return response({res,message:"success delete the post!"})
   } catch (error) {
    return response({
        res,
        status : 'Internal error!',
        code : 500,
        message:`${error}`
    })
   }
},
ShowAll :async (req,res)=>{
    
const authorId = toInteger(req.params.authorId)
try {
    const posts = await prisma.post.findMany({
        where: { authorId: parseInt(authorId) },
        include: { author: {select:{
            name:true,
            username:true
        }} }
    });
    return response({res,data:posts})
} catch (error) {
    return response({
        res,
        status : 'Internal error!',
        code : 500,
        message:`${error}`
    })
}
},
getSinglepost: async(req,res) =>{
const {id} = req.params
// console.log(id)
try {
    const post = await prisma.post.findUnique({
        where: { id:id },
        include: { author: {select:{
            name:true,
            username:true
        }} }
    });
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

}
export default Controller