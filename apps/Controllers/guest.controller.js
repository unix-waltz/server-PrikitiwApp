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
getAuthor:async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;
    const {author} = req.params
    try {
        const data = await prisma.post.findMany({where:{author: {
            username: author
        }},
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: { author: {select:{
                name:true,
                username:true
            }} }}) 
            const totalPosts = await prisma.post.count({where:{ author: {
                username: author
            }}});
        const totalPages = Math.ceil(totalPosts / pageSize);
        return response({res,data:{
            meta: {
                page : page > totalPages ? false :true,
                totalPosts,
                totalPages,
                currentPage: page,
            },
            data : data ? data :undefined
        }})
    } catch (error) {
        return InternalError({res,error})
    }
},
getCategory:async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;
    const {category} = req.params
    try {
       const data = await prisma.post.findMany({where:{category:category},
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { author: {select:{
            name:true,
            username:true
        }} }}) 
        const totalPosts = await prisma.post.count({where:{category:category}});
        const totalPages = Math.ceil(totalPosts / pageSize);
        return response({res,data:{
            meta: {
                page : page > totalPages ? false :true,
                totalPosts,
                totalPages,
                currentPage: page,
            },
            data : data ? data :undefined
        }})
    } catch (error) {
        return InternalError({res,error})
    }
},
searchPosts: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;
    const { keyword } = req.query;

    try {
        const data = await prisma.post.findMany({
            where: {
                OR: [
                    { title: { contains: keyword, lte: 'insensitive' } },
                    { body: { contains: keyword, lte: 'insensitive' } }
                ]
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                author: {
                    select: {
                        name: true,
                        username: true
                    }
                }
            }
        });

        const totalPosts = await prisma.post.count({
            where: {
                OR: [
                    { title: { contains: keyword, lte: 'insensitive' } },
                    { body: { contains: keyword, lte: 'insensitive' } }
                ]
            }
        });

        const totalPages = Math.ceil(totalPosts / pageSize);

        return response({
            res,
            data: {
                meta: {
                    page: page > totalPages ? false : true,
                    totalPosts,
                    totalPages,
                    currentPage: page
                },
                data: data.length ? data : undefined
            }
        });
    } catch (error) {
        return InternalError({ res, error });
    }
},
AllPost :async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;

    try {
       const data = await prisma.post.findMany({
        skip: (page - 1) * pageSize,
      take: pageSize,
        include: { author: {select:{
            name:true,
            username:true
        }} }}) 
        const totalPosts = await prisma.post.count();
        const totalPages = Math.ceil(totalPosts / pageSize);
        return response({res,data:{
            meta: {
                page : page > totalPages ? false :true,
                totalPosts,
                totalPages,
                currentPage: page,
            },
            data : data ? data :undefined
        }})
    } catch (error) {
        return InternalError({res,error})
    }
},
}
export default Controller