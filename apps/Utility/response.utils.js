const response = ({
    res,
    status = 'success',
    code = 200,
    data,
    message,
    token
})=>{
    return res.status(code).json({
        code : code,
        status: status,
        data: data,
        message: message,
        _token:token
    })
}
const InternalError = ({res,error})=>{
    return response({res,status:"failed",code:500,message:error})
}
const NotFound = ({res,message="cannot find the resource"})=>{
    return response({res,status:"failed",code:404,message})
}
const Forbidden = ({res,message="This Action Is Forbidden!"})=>{
    return response({res,status:"failed",code:403,message})
}

export  {InternalError,NotFound,Forbidden,response}
