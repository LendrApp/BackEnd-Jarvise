const jwt = require('jsonwebtoken')
const secret = require('../config/secrets.js')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

console.log('token', token)
  if(token){
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if(err){
        res.status(401).json({message: 'invalid credentials, you shall not pass'})
      }else{
        req.user = {username: decodedToken.username}
        next()
      }
    })
  }else{
  res.status(400).json({ you: 'No credentials, shall not pass!' });
  }
};