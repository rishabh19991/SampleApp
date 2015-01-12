'use strict';

var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var authTypes = ['github', 'twitter', 'facebook', 'google'],
    SALT_WORK_FACTOR = 10;

/**
 * User Schema
 */
var UserSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: {
        type: String,
        unique: true
    },
    hashedPassword: String,
    salt: String
});


/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function (password) {
      this._password = password;
      this.salt = this.makeSalt();
      this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
      return this._password;
  });

// Basic info to identify the current authenticated user in the app
//Mayur
UserSchema
    .virtual('practicename')
    .set(function (practicename) {
        this._practice = practicename;
    })
    .get(function () {
        return this._practice;
    });

//Mayur
UserSchema
  .virtual('userInfo')
  .get(function () {
      return {
          'id': this._id,
          'name': this.name,
          //'role': this.getrole(this.practicename),
          //'practicename': this.practicename,
          'username': this.username,
          //'rolename': this.getrolename(this.practicename),
          //'level': this.getlevel(this.practicename, this.username)
      };
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function () {
      return {
          'name': this.name,
          'role': this.role
      };
  });



/**
 * Validations
 */
var validatePresenceOf = function (value) {
    return value && value.length;
};

// Validate empty email
UserSchema
  .path('email')
  .validate(function (email) {
      // if you are authenticating by any of the oauth strategies, don't validate
      if (authTypes.indexOf(this.provider) !== -1) return true;
      return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function (hashedPassword) {
      // if you are authenticating by any of the oauth strategies, don't validate
      if (authTypes.indexOf(this.provider) !== -1) return true;
      return hashedPassword.length;
  }, 'Password cannot be blank');

/**
 * Plugins
 */
UserSchema.plugin(uniqueValidator, { message: 'Value is not unique.' });

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function (next) {
      if (!this.isNew) return next();

      if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
          next(new Error('Invalid password'));
      else
          next();
  });

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function (password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    },

    validProfileInfo: function (password, cb) {
        this.model('User').findOne({ username: this.username, email: this.email },
          function (err, user) {
              if (err) return cb(null, false);
              if (!user) return cb(null, false);
              if (!user.authenticate(password)) return cb(null, false);
              return cb(null, user);
          }
        );
    },

    validPassword: function (password, cb) {

        this.model('User').findOne({ email: this.email },
          function (err, user) {

              if (err) return cb(null, false);
              if (!user) return cb(null, false);
              if (!user.authenticate(password)) {
                  console.log('not authenticate');
                  return cb(null, false)
              };
              return cb(null, user);
          }
        );
    },

    isPresent: function (cb) {
        this.model('User').count({ username: this.username })
          .exec(cb)
    }
};

UserSchema.statics = {
    uniqueemail: function (options, cb) {
        this.find({ email: options.uemail })
          .exec(cb)
    },
    uniquename: function (options, cb) {
        this.find({ username: options.uname.toLowerCase() })
          .exec(cb)
    },
    list: function (options, cb) {
        this.find()
            .sort({ name: 1 }) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    search: function (options, cb) {
        this.find({ $or: [{ 'username': { $regex: options.search, $options: 'i' } }, { 'email': { $regex: options.search, $options: 'i' } }] })
          .sort({ username: 1 })
          .limit(options.perPage)
          .skip(options.perPage * options.page)
          .exec(cb)
    }
};

mongoose.model('User', UserSchema);