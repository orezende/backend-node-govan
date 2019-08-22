const express = require('express');
const routes = express.Router();


//CONTROLLERS IMPORTATIONS

const UserController = require('./app/controllers/User/UserController');

const AuthController = require('./app/controllers/Authentication/AuthController');
const ProjectController = require('./app/controllers/Authentication/ProjectController');
const authMiddleware = require('./app/middlewares/auth');

const ResetPasswordController = require('./app/controllers/ResetPassword/ResetPasswordController');
const ForgotPasswordController = require('./app/controllers/ResetPassword/ForgotPassowrdController');



//VERIFY AUTH USING MIDDLEWARE  
routes.use('/index', authMiddleware);
routes.get('/index', ProjectController.index);

//AUTH USER 
routes.post('/auth/user', AuthController.store);

//RESET PASSWORD
routes.post('/forgot_password',ForgotPasswordController.store);
routes.post('/reset_password', ResetPasswordController.store);

//USERS
routes.get('/list/user', UserController.index);
routes.post('/register/user', UserController.store);
routes.put('/change/user', UserController.update);


module.exports = routes;