const jwt=require('jsonwebtoken');

function verifyToken(req,res,next){
    try{
        
        const tokenreceived=req.headers.authorization;
        if (!tokenreceived) {
            return res.status(401).json({
                message: "Token not found"
            });
        }
        const token=tokenreceived.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_KEY);
        req.user = decoded;
        next();    
    }catch(err){
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}
module.exports=verifyToken;