var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  firstName:{
    type:String,
    unique:false,
    required:true
  },
  lastName:{
    type:String,
    unique:false,
    required:true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type:String,
    required: false,
  },
  profileImagePath: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  }
});

/*hashing a password before saving it to the database only if new user
We do not want to rehash a hash on update (ask me how I know)*/
UserSchema.pre('save', function (next) {
  var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
        if (user.isNew) {
          user.password = hash;
        }
        next();
    })
});


var User = mongoose.model('User', UserSchema);
module.exports = User;
