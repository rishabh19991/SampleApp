'use strict';

angular.module('sampleApp')
    .controller('SignupCtrl', function ($scope, $http, $locale, $location, newUser, UsersUnique) {


        $scope.user = {};
        $scope.errors = {};
        $scope.practice = new Object();

        $scope.register = function (form) {

            $scope.submitted = true;
            $scope.sectionValidate = true;
            debugger;
            newUser.save($scope.practice, function () {
                $scope.step = 4;
            }).$promise
                .then(function () {
                    $scope.regMaindiv = true;
                })
                .catch(function (err) {

                    err = err.data;
                    $scope.errors = { 'error': err };
                    $scope.haserror = true;
                    // Update validity of form fields that match the mongoose errors
                    angular.forEach(err.errors, function (error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
        };

        $scope.validateform1 = function (step1form) {
            if ($scope.practice.password != $scope.practice.confirmpassword) {
                return false;
            }
            $scope.submitted = true;
            $scope.sectionValidate = true;
            debugger;
            if (step1form.$valid) {

                if ($scope.uniquePracticename == true) {
                    $scope.sectionValidate = false;
                }

                //if($scope.UniqueemailId == true) {
                //  $scope.sectionValidate = false;
                //}

                if ($scope.Uniqueuser == true) {
                    $scope.sectionValidate = false;
                }

                if ($scope.StrongPassmess == true) {
                    $scope.sectionValidate = false;
                }

                if ($scope.MatchedPass == true) {
                    $scope.sectionValidate = false;
                }

                if ($scope.sectionValidate == false) {
                    $scope.step = 1;
                }
                else {
                    $scope.step = 2;
                    $scope.submitted = false;
                }
                        $scope.register(myform);
            }
        };

        $scope.validatePassword = function (password) {

            var p = password;
            var errors = [];
            if (p.length < 8) {
                errors.push("Your password must be at least 8 characters.")
            }
            if (p.search(/[A-Z]/) < 0) {
                errors.push("Your password must contain at least one Capital letter.")
            }
            if (p.search(/[a-z]/) < 0) {
                errors.push("Your password must contain at least one Small letter.")
            }
            if (p.search(/[$&+,:;=?@#|'<>.^*()%!-]/) < 0) {
                errors.push("Your password must contain at least one Special Character.")
            }
            if (p.search(/[0-9]/) < 0) {
                errors.push("Your password must contain at least one digit.")
            }
            if (errors.length > 0) {
                $scope.StrongPassmess = true;
            }
            else {
                $scope.StrongPassmess = false;
            }
        };

        $scope.matchpassword = function (pass, cpass) {
            var pass = pass;
            var cpass = cpass;
            if (cpass) {
                if (pass == cpass) {
                    $scope.MatchedPass = false;

                }
                else {
                    $scope.MatchedPass = true;
                }
            }
        };

        $scope.UniqueEmail = function (email) {
            $scope.email = email;
            var query = { email: email }
            if (email) {
                UsersUnique.uniqueemail().get(query, function (result) {
                    if (result[0] == 't') {
                        $scope.UniqueemailId = false;
                    }
                    else {
                        $scope.UniqueemailId = true;
                    }
                });
            }
        };

        $scope.UniqueUsername = function (username) {
            $scope.username = username;
            var query = { username: username }
            if (username) {
                UsersUnique.uniqueusername().get(query, function (result) {
                    if (result[0] == 't') {
                        $scope.Uniqueuser = false;
                    }
                    else {
                        $scope.Uniqueuser = true;
                    }
                });
            }
        };
    });