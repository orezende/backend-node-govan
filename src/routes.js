const express = require('express');

const DriverController = require('./controllers/DriverController');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const routes = express.Router();


//USERS
routes.get('/user', UserController.index);
routes.post('/user', UserController.store);
routes.put('/user', UserController.update);

//DRIVERS
routes.get('/driver', DriverController.index);
routes.post('/driver', DriverController.store);
routes.put('/driver', DriverController.update)

//AUTH
routes.post('/auth', AuthController.store);


module.exports = routes;