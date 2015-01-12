
'use strict';

var mongoose = require('mongoose'),
    usercollection = mongoose.model('User');

/**
 * Custom practice middleware used by the application
 */
module.exports = {

    /**
       * Authentication check for practice name active and exists
       */
    authenticate: function (req, res, next) {
        var userName = String(req.body.username);
        var userPass = String(req.body.password);

        // Check if username for practice name is active
        usercollection.find({ 'username': userName }).exec(function (err, result) {
            if (err) return res.send(401);
            if (result.length == 1) {
                // res.send(200);
                return next();
            }
            else {
                return res.send(401, { message: 'Invalid credentials or user inactive' });
            }
        });
    }
};


