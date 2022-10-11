const jwt = require("jsonwebtoken"); //jwt
const JWT_SECRET = "heavyDriv@r";


const fetchUser=(req,res,next)=>{
    try {
        //get The user by token and use ID and append it to request object
        let success=false;
        const token = req.header('authToken');//get token from url arguments
        if(!token){
            res.status(401).send({success:false,error:"Please authenticate using a valid token."});
        }
        const str = jwt.verify(token,JWT_SECRET);
        req.user = str.user;
        next();
    } catch (error) {
        res.status(500).send({success:false,error:"Internal server error occured. Please try again!"})
    }
}

module.exports = fetchUser;