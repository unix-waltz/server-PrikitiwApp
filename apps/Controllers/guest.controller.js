import _ from "lodash"
import {response,Forbidden,InternalError} from "./../Utility/response.utils.js"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
const Controller = {
Index : async(req,res) =>{
    try {
        const result = await prisma.post.findMany({orderBy:{created_at:'desc'},include: { author: {select:{
            name:true,
            username:true
        }} },take:8})
        return response({res,data:result})
    } catch (error) {
        return InternalError({res,error})
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
        return InternalError({res,error})
    }
    },
Search : () =>{},
AllPost : () =>{}
}
export default Controller