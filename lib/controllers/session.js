'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    crypto = require('crypto'),
    LocalStrategy = require('passport-local').Strategy,
    passport = require('passport'),
    config = require('../config/config');

var SALT_WORK_FACTOR = 10;

/**
 * Logout
 */
exports.logout = function (req, res) {

    req.logout();
    res.send(200);
};


/**
 * CheckCredentails for forgot password /username
 */

exports.checkcredentails = function (req, res) {
    console.log(req.body);
    var practicename = String(req.body.practicename);
    var email = String(req.body.email);
    var forgotuser = Boolean(req.body.forgotuser);
    var username = String(req.body.username);
    var password = String(req.body.password);
    var securityquestion = String(req.body.securityquestion);
    var answer = String(req.body.answer);
    //Validate user by his email id and practice
    User.findOne({'email': email, 'practice': {$elemMatch: {'name': practicename, 'status': 'active'}} }).exec(function (err, user) {
        if (err) return res.json(401, err);
        console.log("checking user");
        //User not found
        if (!user) return res.json(401, "Invalid Credentials");
        console.log(user);
        console.log("checking password or username....");
        //invalid password if forgot username

        if (forgotuser == true) {
            console.log("checking password ");
            if (!user.authenticate(password)) return res.json(401, "Invalid Credentials");
        }
        else {
            console.log("checking  username");
            if (user.username != username) return res.json(401, "Invalid Credentials");
        }
        console.log("checking security question");
        console.log(user.question + ".." + securityquestion);
        console.log(user.answer + ".." + answer);
        //invalid question and answer
        if ((user.question != securityquestion) || (user.answer != answer)) return res.json(401, "Invalid Credentials");
        //send him mail
        if (forgotuser == true) {
            var locals = {
                to: email
            }
            var placeholders = {
                username: user.username
            }

            mail.sendMailMsg('ForgotUsername', locals, placeholders, function (err, result) {
                console.log(result + "" + err);
                if (err) res.render('error', {status: 500});
            });
        }
        else {
            mail.sendMailMsg('ForgotPassword', {to: email}, {link: config.domainurl + 'confirmpassword/' + user._id}, null, function (err, result) {
                if (err) res.render('error', {status: 500});
                User.update({'email': email }, {'resetpwddateExpire': new Date() }).exec(function (err, result) {
                    if (err) return res.send(500);
                });
            });
        }

        return res.send(200);

    });
};

/**
 * Login : Called after middleware practice is called
 */
exports.login = function (req, res, next) {

    passport.authenticate('local', function (err, user, info) {

        var error = err || info;
        if (error) return res.json(401, error);
        req.logIn(user, function (err) {
            if (err) return res.send(err);
            console.log("login" + req.user.userInfo);
            res.json(req.user.userInfo);
        });
    })(req, res, next);


};

