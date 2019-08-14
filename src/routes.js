const express = require('express');

const DriverController = require('./controllers/DriverController');
const userController = require('./controllers/UserController');

const routes = express.routes();


//DRIVERS
routes.get('/driver', DriverController.index);
routes.post('/driver', DriverController.store);

//USERS
routes.get('/user', DriverController.index);
routes.post('user', DriverController.store);

module.exports(routes);