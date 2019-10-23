const router = require('express').Router();
const bcrypt = require('bcryptjs')
//const JWT = require('jsonwebtoken')
const Users = require('./auth-model.js')
const Token = require('./authToken.js')



router.get("/register", (req, res) => {
  Users.find()
  .then(user => {
    res.status(200).json(user);
  });
});


router.post('/register', (req, res) => {
  // implement registration
  const {username, password, email, fullName} = req.body

  
  const hash = bcrypt.hashSync(password, 10)

  Users.add({username, password: hash, email, fullName})
  .then(save => {
    res.status(201).json(save)
  })
  .catch(err => {
    res.status(500).send(err)
  })
});


router.get("/login", (req, res) => {
  Users.find()
  .then(user => {
    res.status(200).json(user);
  });
});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body

  Users.findBy({username})
  .first()
  .then(user => {
    console.log('user', user)
    if(user && bcrypt.compareSync(password, user.password)){
        const token = Token.generateToken(user)
        res.status(200).json({user: user.username, token: token})
    }else{
      res.status(401).json({message: 'invalid credential, you shall not pass'})
    }
  })
  .catch(err => {
    console.log('err', err)
    res.status(500).send(err)
  })
});

module.exports = router;