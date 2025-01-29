
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

async function validateToken(req, res, next) {
  
    if (req.path === '/generate-token') {
        return next();
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJGcm9udC1NYW4iLCJpYXQiOjE3MzgxNTIzNDksImV4cCI6MTczODE1NTk0OX0.x8OnyPu4KaMsZlSkcYmTOW2pBGFJJabmzqK9CHUWxgU";
    if (!token) {
        return res.status(401).json({
            error: true,
            message: "Access token is missing",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user; 
        next();
    }
)}

module.exports=validateToken;



