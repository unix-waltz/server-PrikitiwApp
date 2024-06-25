import response from "../Utility/response.utils.js"
import _ from 'lodash'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const Controller = {
    Login : (req,res)=>{
return response({
    res,
})

    },
    Logout : (req,res)=>{
        res.send('logout')
    },
    Register : async (req,res)=>{
        const {email,password,username} = req.body
        if(_.isNil(email)|| _.isNil(password)|| _.isNil(username)) 
            return response({
            res,
            status : 'failed',
            code : 404,
            message:"data is empty"
        })
          try {
            const emailexist = await prisma.user.findUnique({where:{email:email}})
            const usernameexist = await prisma.user.findUnique({where:{username:username}})
            if(emailexist || usernameexist)
             return response({
                 res,
                 status : 'failed',
                 code : 404,
                 message:"email or username is alredy exist"
             })
             let hash = await bcrypt.hash(password,10)
         return response({
            res,
            data: await prisma.user.create({data:{email,username,password : hash}})
        });
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