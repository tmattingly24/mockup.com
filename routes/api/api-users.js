var express = require('express');
var userController = require('../../controllers/userController');
var router   = express.Router();
var User = require('../../models/user');

// Preflight Middleware
router.use((req, res, next) => {
  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
  });
  // check for Preflight
  if(req.method === 'OPTIONS'){
    return res.status(200).end();
  }
  next();
});

//routers
router.post('/login', userController.loginUser); // POST route to login user followed by redirect to profile page
router.get('/logout', function (req, res, next) {
  userController.logOutUser;
  res.redirect('/');
});
router.put('/create', userController.createUser); //PUT route to create a new user
router.put('/update', userController.updateUser); //PUT route to create a new user
router.get('/findUser', userController.findUser); //GET Request to find user info
router.delete('/delete', userController.deleteUser); //GET Request to find user info


module.exports = router;
