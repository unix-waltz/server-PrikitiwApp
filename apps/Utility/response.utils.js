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
export  {response}