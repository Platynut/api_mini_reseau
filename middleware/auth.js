const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Token manquant ou invalide" });
    }
    try{
        req.token = jwt.verify(token,process.env.JWT_KEY);
        next();
    }catch(e){
        res.status(401).json({error : "Vous devez être authentifié pour réaliser cette action"});
    }
    
}

module.exports = auth;