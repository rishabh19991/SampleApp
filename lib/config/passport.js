
'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

/**
 * Passport configuration
 */
module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, {id:user.id,practice:user.practicename});
  });
  passport.deserializeUser(function(userobj, done) {
    console.log('deserial  '+userobj.practice)
    User.findOne({
      _id: userobj.id
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
        if (!err && user)
           user.practicename = userobj.practice;
      done(err, user);
    });
  });

  // add other strategies for more authentication flexibility
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(username, password, done) {
      User.findOne({
        username: username
      }, function(err, user) {
        if (err) return done(err);
        
        if (!user) {
          return done(null, false, {
            message: 'This user is not registered.'
          });
        }
        if (!user.authenticate(password)) {
          return done(null, false, {
            message: 'This password is not correct.'
          });
        }

        return done(null, user);
      });
    }
  ));
};