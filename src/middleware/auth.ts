import jwt from "jsonwebtoken"
export const SECRET = 'ABCD'
export const auth = (req,res,next)=>{
    let authorization = req.headers.authorization
    if(authorization){
        let accessToken = authorization.split(' ')[1]

        if(!accessToken){
            res.json({
                mess:"Người dùng chưa xác thực"
            })
        }else {
            jwt.verify(accessToken,SECRET,(err,data)=>{
                if(err){
                    res.json({
                        mess:"Người dùng chưa xác thực"
                    })
                }else {
                    req.decode = data
                    next()
                }
            })
        }
    }else {
        res.json({
            mess:"Người dùng chưa xác thực"
        })
    }
}