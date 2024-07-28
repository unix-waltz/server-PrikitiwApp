const setcookie = ({res,token})=>{
    res.cookie("_token", token, {
        path: "/",
        sameSite: "Strict",
        httpOnly: true,
      });
}
const deletecookie = (res)=>{
    res.clearCookie("_token", {
        path: "/",
        sameSite: "Strict",
        httpOnly: true,
      });
}
const getcookie = (req)=>{
    return req.cookies._token;
}
export {setcookie,deletecookie,getcookie}