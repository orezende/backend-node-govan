const express = require('express');

const DriverController = require('./controllers/DriverController');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const ProjectController = require('./controllers/ProjectController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();
//AUTH
routes.use('/index', authMiddleware);
routes.get('/index', ProjectController.index);

routes.post('/auth/user', AuthController.store);

//USERS
routes.get('/list/user', UserController.index);
routes.post('/register/user', UserController.store);
routes.put('/change/user', UserController.update);


//DRIVERS
routes.get('/driver', DriverController.index);
routes.post('/driver', DriverController.store);
routes.put('/driver', DriverController.update)

//PROJECT

module.exports = routes;