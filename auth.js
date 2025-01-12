const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth =(req, res, next) => {
  try {
    const token = req.header.authorization?.split(' ')[1];
    if(!token) {
      return res.status(401).send({message : 'Token tidak ditemukan.'});
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ message: 'token tidak valid.' });
  }
}
module.exports = auth;