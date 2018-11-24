var userService = require('../services/userService');
var log = require('log-util');

const userFunctions = {
    checkPasswordsMatch: function(password, confirmPassword)
    {
          if (password !== confirmPassword) {
              return(false);
          }else{
              return(true);
          }
    },

    allData: function(fName, lName, email, password)
    {
          if (fName && lName &&
              email && password) {
                return(true);
          } else{
              return(false);
            }
    },

    checkPasswordLength: function(password){

        if(password.length < 8){
            return(false)
        }
        else{
            return(true);
        }

    },

	createUser: function(req, res, next)
	{

    var errorMsg = '';
    if(!userFunctions.checkPasswordLength(req.body.password)){
      errorMsg+=" | Passwords must be at least 8 charachters.";
    }
    if(!userFunctions.checkPasswordsMatch(req.body.password, req.body.passwordConf)){
      errorMsg+=" | Passwords must match.";
    }
    if(!userFunctions.allData(req.body.firstName, req.body.lastName, req.body.password, req.body.passwordConf)){
      errorMsg+=" | All fields are required.";
    }
    if(errorMsg){
      res.status(400);
      res.send(errorMsg);
    } else {
        userService.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
      })
    		.then((user) => {
          req.session.userId = user._id;
          res.status(201);
          res.json(user);
    		})
    		.catch((err) => {
          console.log(err);
          res.status(400);
          log(err);
          res.send("There was a problem creating your account try again...");
    		});
      }
	},


    loginUser: function(req, res, next)
  	{
  		userService.login({
          email: req.body.email,
          password: req.body.password,
  		})
  		.then((user) => {
        req.session.userId = user._id;
        res.status(200);
  			res.json(user);
  		})
  		.catch((err) => {
        res.status(401);
        res.send(err);
  		});
  	},

    findUser: function(req, res, next)
    {
      userService.find({
          id: req.session.userId
      })
      .then((user) => {
        res.status(200);
  			res.json(user);
  		})
  		.catch((err) => {
        res.status(400);
        res.send(err);
  		});
    },

    updateUser: function(req, res, next)
  	{
      var errorMsg = '';
        console.log(req.body.firstName);
      if(!userFunctions.checkPasswordLength(req.body.password)){
        errorMsg+=" | Passwords must be at least 8 charachters.";
      }
      if(!userFunctions.checkPasswordsMatch(req.body.password, req.body.passwordConf)){
        errorMsg+=" | Passwords must match.";
      }
      if(!userFunctions.allData(req.body.firstName, req.body.lastName, req.body.password, req.body.passwordConf)){
        errorMsg+=" | All fields are required.";
      }
      if(errorMsg){
        res.status(400);
        res.send(errorMsg);
      } else {
          userService.update(req.session.userId,{
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: req.body.password
        })
      		.then((user) => {
            res.status(201);
            res.json(user);
      		})
      		.catch((err) => {
            console.log(err);
            res.status(400);
            res.send("There was a problem updating your account try again...");
      		});
        }
  	},
    deleteUser: function(req, res, next) {
      userService.delete(req.session.userId)
        .then((user) => {
            req.session.destroy();
            res.status(200);
            res.json(user);
        })
        .catch((err) => {
            res.status(500)
            log.error(`Deleting Mountain error: ${err}`);
            res.end('Deleting Mountain error.');
        });
    }
}
module.exports = userFunctions;
