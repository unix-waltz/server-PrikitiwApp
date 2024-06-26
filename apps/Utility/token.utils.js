import jwt from "jsonwebtoken"
const setToken = ({payload})=>{
const access_token = jwt.sign(payload,process.env.APP_ACCESS_TOKEN,{expiresIn:'30s'})
const refresh_token = jwt.sign(payload,process.env.APP_REFRESH_TOKEN,{expiresIn:'10h'})
return {access_token,refresh_token}
}
const refreshToken = ({payload})=>{
    const refresh_token = jwt.sign(payload,process.env.APP_REFRESH_TOKEN,{expiresIn:'10h'})
    return {refresh_token}
    }
const accessToken = ({payload})=>{
    const access_token = jwt.sign(payload,process.env.APP_ACCESS_TOKEN,{expiresIn:'30s'})
    return {access_token}
    }
const decodeToken = ({token,type})=>{
    let decode
    if(type == 'access') decode = jwt.verify(token,process.env.APP_ACCESS_TOKEN)
    if(type == 'refresh') decode = jwt.verify(token,process.env.APP_REFRESH_TOKEN)
    if(type != 'refresh' && type != 'access') throw new Error('invalid token type!')
    return decode
}
       
export {setToken,refreshToken,accessToken,decodeToken}