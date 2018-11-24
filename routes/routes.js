var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {

      res.render('index', {title: "Tim Mattingly | Assignment 5"});
});


// GET route after registering
router.get('/profile', function (req, res, next) {
  if(req.session.userId == undefined){
    res.redirect('/');
  } else {
    res.render('profile', {
      title: "Tim Mattingly | Assignment 5",
      loggedIn: true
    });
  }
});

// GET delete user page
router.get('/updateUser', function (req, res, next) {
  if(req.session.userId == undefined){
    res.redirect('/');
  } else {
    res.render('update', {
      title: "Tim Mattingly | Assignment 5",
      loggedIn: true
    });
  }
});
// GET update user page
router.get('/deleteUser', function (req, res, next) {
  if(req.session.userId == undefined){
    res.redirect('/');
  } else {
    res.render('delete', {
      title: "Tim Mattingly | Assignment 5",
      loggedIn: true
    });
  }
});
// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});
module.exports = router;
