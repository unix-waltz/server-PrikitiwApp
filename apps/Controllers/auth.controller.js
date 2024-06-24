import response from "../Utility/response.utils.js"
const Controller = {
    Login : (req,res)=>{
return response({
    res,
    status : 'test',
    code : 200
})

    },
    Logout : (req,res)=>{
        res.send('logout')
    },
    Register : async (req,res)=>{
        const {email,password,username} = req.body

    },
}
export default Controller