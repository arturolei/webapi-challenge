const express = require('express');
const server = express();

//Routers
const actionsRouter = require('./routers/actionsRouter.js');
const projectsRouter = require('./routers/projectsRouter.js');

server.use(logger);
server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions',actionsRouter);


server.get('/', (req, res) => {
    res.send(`<h2>The server is alive!!!</h2>`)
  });

//Custom Middleware for Logging Stuff
function logger(req, res, next) {
  console.log(`request METHOD: ${req.method}, request URL: ${req.url}, Current Date and Time: ${Date().toString()}`)
  next();
};

module.exports = server;