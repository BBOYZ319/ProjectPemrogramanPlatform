
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (userData) => {
    const payload = {
        id: userData.id,
        username: userData.username,
       
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); 
    return token;
};

module.exports = { generateToken };