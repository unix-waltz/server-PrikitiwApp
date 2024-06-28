import {response}from "../Utility/response.utils.js"
import _ from 'lodash'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import {setToken,decodeToken} from './../Utility/token.utils.js'
import {setcookie,deletecookie,getcookie} from './../Utility/cookie.utils.js'

const prisma = new PrismaClient()
const Controller = {
    Login :async (req,res)=>{
        const {email,password} = req.body
        if(_.isNil(email)|| _.isNil(password)) 
            return response({
            res,
            status : 'failed',
            code : 404,
            message:"username or password is empty"
        })
        try {
            const emailexist = await prisma.user.findUnique({where:{email:email}})
            if(!emailexist )
                return response({
                    res,
                    status : 'failed',
                    code : 404,
                    message:"email not found!"
                })
                const valid = await bcrypt.compare(password,emailexist.password)
                if(!valid )
                    return response({
                        res,
                        status : 'failed',
                        code : 403,
                        message:"wrong password!"
                    })
                    // set jwt
                    const {access_token,refresh_token} = setToken({payload:{
                        email:emailexist.email,
                        username:emailexist.username,
                        role:emailexist.role
                    }})
                    // set cookie
setcookie({res,token:refresh_token})
                    // update user
await prisma.user.update({where:{email:email},data:{refreshtoken:refresh_token}})
                    // success
                    return response({
                        res,
                        token:access_token,
                        message:'Login success'
                    })
        } catch (error) {
            return response({
                res,
                status : 'Internal error!',
                code : 500,
                message:`${error}`
            })
        }
    },
    Logout : async (req,res)=>{
const cookie = getcookie(req)
try {
    await prisma.user.update({where:{refreshtoken:cookie},data:{refreshtoken:''}})
setcookie({res,token:''})
deletecookie(res)
console.log(cookie)

return response({
    res,
    message:'logout succes!',
    token:getcookie(req)
})
} catch (error) {
    return response({
        res,
        status : 'Internal error!',
        code : 500,
        message:`${error}`
    }) 
}
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
    Refresh : async (req,res) => {
// get cookie
const cookie = getcookie(req)
console.log(cookie)
try {
    if(_.isNil(cookie)) throw new Error('invalid cookie!')
    // find cookie in db
    const foundusr = await prisma.user.findFirst({where:{refreshtoken:cookie}})
// check reuse cookie
if(!foundusr){
const decode = decodeToken({token:cookie,type:'refresh'})
await prisma.user.update({where:{email:decode.email},data:{refreshtoken:''}})
// console.log(decode)
return response({
    res,
    status : 'Forbidden!',
    code : 403,
    message:`${error}`
})
}
// new jwt
const {access_token,refresh_token} = setToken({payload:{
    email:foundusr.email,
    username:foundusr.username,
    role:foundusr.role
}})
// update user jwt
await prisma.user.update({where:{email:foundusr.email},data:{refreshtoken:refresh_token}})
// clear cookie 
deletecookie(res)
// set new cookie
setcookie({res,token:refresh_token})
// response
return response({
    res,
    message:'new token',
    token:access_token
})
} catch (error) {
    return response({
        res,
        status : 'Internal error!',
        code : 500,
        message:`${error}`
    }) 
}

    }
}
export default Controller