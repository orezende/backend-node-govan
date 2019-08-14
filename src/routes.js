const express = require('express');

const DriverController = require('./controllers/DriverController');
const UserController = require('./controllers/UserController');

const routes = express.Router();


//DRIVERS
routes.get('/driver', DriverController.index);
routes.post('/driver', DriverController.store);
routes.put('/driver', DriverController.update);

//USERS
routes.get('/user', DriverController.index);
routes.post('/user', DriverController.store);
routes.put('/user', UserController.update);

module.exports = routes;