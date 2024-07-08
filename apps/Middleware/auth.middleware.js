import { decodeToken } from "../Utility/token.utils.js"
import _ from "lodash"
import {response} from "./../Utility/response.utils.js"
const Middleware = {
useAuth : (req,res,next)=>{
    const header = req.headers.authorization
    if(_.isNil(header)) return response({res,code:401,status:"Failed!",message:"No Token Provided!"})
try {
    const token = header.split(' ')[1]
    const decode = decodeToken({token,type:'access'})
    req.user = decode
    next()
} catch (error) {
    return response({res,code:401,status:"Failed!",message:"No Token Provided!"})
}
},
useRole:(role)=> (req,res,next) => {
    const header = req.headers.authorization
    if(_.isNil(header)) return response({res,code:401,status:"Failed!",message:"No Token Provided!"})
   try {
      const token = header.split(' ')[1]
     const decode = decodeToken({token,type:'access'})
     req.user = decode
     if (role == decode.role) return next()
    return response({res,code:401,status:"Failed!",message:"No Token Provided!"})
   } catch (error) {
    return response({res,code:401,status:"Failed!",message:"No Token Provided!"})
   }

}
}
export const {useAuth,useRole} = Middleware
export default Middleware