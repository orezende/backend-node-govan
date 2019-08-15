const express = require('express');

const DriverController = require('./app/controllers/DriverController');
const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const ProjectController = require('./app/controllers/ProjectController');
const ResetPasswordController = require('./app/controllers/ResetPasswordController');
const ForgotPasswordController = require('./app/controllers/ForgotPassowrdController');

const authMiddleware = require('./app/middlewares/auth');

const routes = express.Router();
//AUTH USING MIDDLEWARE  
routes.use('/index', authMiddleware);
routes.get('/index', ProjectController.index);
routes.post('/auth/user', AuthController.store);

//RESET PASSWORD
routes.post('/forgot_password',ForgotPasswordController.store);
routes.post('/reset_password', ResetPasswordController.store);
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