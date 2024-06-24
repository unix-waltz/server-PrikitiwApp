const response = ({
    res,
    status,
    code,
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
export default response