var User = require('../models/user');
var bcrypt = require('bcrypt');
var log = require('log-util');

const userService = {};

	userService.create = (userObj) => {
		console.log("user service");
		var user = new User(userObj);
		return user.save()
			.then((user) => {
				return user;
			})
			.catch((err) => {
				throw err;
			});
	};

	userService.delete = (userId) => {
		console.log(userId);
		return User.findByIdAndRemove(userId)
		.then((user) => {
			return user;
		})
		.catch((err) => {
			throw err;
		});
	};

	userService.update = (userId, userObj) => {
		return User.findOne({ _id: userId }, function (err, doc){
          if(err)
          {

          }else {
            doc.firstName = userObj.firstName;
            doc.lastName = userObj.lastName;
            doc.password = userObj.password;
            doc.email = userObj.email;
            doc.save();
          }
        })
        .then((user) => {
            return user;
        })
        .catch((err) => {
            throw err;
        });
	};

	userService.login = (credentials) => {
		return new Promise(function(resolve, reject) {
   		return User.findOne({ email: credentials.email })
	 			.then((user) => {
			    if(!user) {
			      return reject("Username is incorrect");
			    }
				if(user){
					bcrypt.compare(credentials.password, user.password, function (err, result) {
						if (result === true) {
							  return resolve(user);
						} else {
							return reject("That password does not match our records. Try Again");
						}
					})
				}
			})
		});
	};


	userService.logOut = (session) => {
				session.destroy();
	};

		userService.find = (userId) => {
			return User.findOne({_id: userId.id})
			 .then((user) => {
					 return user;
			 })
			 .catch((err) => {
					 return(err);
			 });
};


module.exports = userService;
