const express = require('express');
const passport = require('passport');

// routers
const userRouter = express.Router();

// require the controllers
const userController = require('../controllers/userController.js');

// handle the GET requests to get all users
userRouter.get('/users', userController.getAllUsers);

// handle the GET request to get current user
userRouter.get('/:email', userController.getUser);

// handle the GET request to get a user by id
userRouter.get('/users/:id', userController.viewUserById);

// handle POST requests to update a user
userRouter.post('/users/edit', userController.editUser);

// handle DELETE requests to delete a user
userRouter.delete('/users/:id', userController.deleteUser);

// login
userRouter.get('/login', userController.checkNotAuthenticated, (req, res) => {
    res.send(req.body);
});

userRouter.post('/login', userController.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// register
userRouter.get('/register', userController.checkNotAuthenticated, (req, res) => {
    res.send(req.body);
});

userRouter.post('/register', userController.checkNotAuthenticated, userController.registerUser);

// handle POST requests to create a user
userRouter.post('/users', userController.registerUser);

// log out
userRouter.delete('/logout', userController.logoutUser);

// send email verification
userRouter.post('/forgotpassword', (req, res) => {
    userController.sendEmail(req.body)
        .then((response) => res.send(response.message))
        .catch((error) => res.status(500).send(error.message))
});

// handle POST requests to update a user password
userRouter.post('/resetpassword', userController.resetPassword);

module.exports = userRouter
