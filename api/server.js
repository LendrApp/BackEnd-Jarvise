const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authRestricted.js');
const authRouter = require('../auth/auth-router.js');
const itemRouter = require('../items/item-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/items', authenticate, itemRouter);
server.use('/', (req, res) => {
    res.send('You Found The Princess!');
});
module.exports = server;