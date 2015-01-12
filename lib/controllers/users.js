'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    crypto = require('crypto'),
    passport = require('passport'),
    config = require('../config/config');

/**
 * Create user
 */
exports.create = function (req, res, next) {
    var newUser = new User(req.body);

    newUser.save(function (err) {
        if (err) {
            // Manually provide our own message for 'unique' validation errors, can't do it from schema
            if (err.errors.email.type === 'Value is not unique.') {
                err.errors.email.type = 'The specified email address is already in use.';
            }
            return res.json(400, err);
        }

        req.logIn(newUser, function (err) {
            if (err) return next(err);

            return res.json(req.user.userInfo);
        });
    });
};

exports.updateUser = function (req, res,next) {
    var userId = req.body.id;
    var options = {
        id: userId,
        firstname: req.body.data.firstname,
        lastname: req.body.data.lastname
    };

    User.update({ _id: options.id }, {
        $set: {
            'firstname': options.firstname,
            'lastname': options.lastname
        }
    }).exec(function (err, result) {
        if (err) return res.send(500);
        if (!err) return res.send(200);
    });
};

exports.list = function (req, res,next) {
    console.log("Enter In List useercontroller");
    //check user role
    //if user role is siteadmin then var query = {}
    //if user role is superadmin then var query = {practice: req.user.practicename
    var page = (req.param('pagenum') > 0 ? req.param('pagenum') : 1) - 1
    var perPage = 9
    var options = {
        perPage: perPage,
        page: page
    }

    User.list(options, function (err, users) {
        if (err) return res.render('500')
        User.count().exec(function (err, count) {
            res.jsonp([{
                title: 'UsersList',
                usersList: users,
                page: page + 1,
                pages: Math.ceil(count / perPage),
                totalitem: count
            }]);
        })
    })
};

exports.uniquename = function (req, res) {
    var uname = req.params.username;
    var options = {
        uname: uname
    }

    User.uniquename(options, function (err, users) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            User.count().exec(function (err, count) {
                if (users == "")
                    res.send(true)
                else
                    res.send(false)
            })
        }

    })
};

exports.uniqueemail = function (req, res) {
    var uemail = req.params.email;
    var options = {
        uemail: uemail
    }

    User.uniqueemail(options, function (err, users) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            User.count().exec(function (err, count) {
                if (users == "")
                    res.send(true)
                else
                    res.send(false)
            })
        }

    })
};