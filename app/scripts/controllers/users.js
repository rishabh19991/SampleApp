'use strict';
angular.module('sampleApp').controller('UsersCtrl', function ($scope, $routeParams, Auth, UsersList, updateUser) {
    $scope.isInviteusermodal = true;
    var userid = $routeParams.userid;
    var practicename = $routeParams.practicename;
    $scope.currentPage = 1;
    $scope.search = "";
    $scope.catId = "";
    $scope.users = {};
    $scope.user = {};
    $scope.updateuser = new Object();
    $scope.recordcount = false;

    $scope.changeView = function (view) {
        switch (view) {
            case $scope.ViewEnum.Card:
                $scope.listViewEnabled = false;
                break;
            case $scope.ViewEnum.List:
                $scope.listViewEnabled = true;
                break;
        }
    };

    $scope.userProfileList = function (pagenumber) {
        debugger;
        var query = {

            pagenum: pagenumber,
            pageController: 'page'
        };
        $scope.currentPage = pagenumber;

        if ($scope.search != "") {
            query.searchId = $scope.search;
            query.searchController = 'search';
        }

        UsersList.query(query, function (usersList) {
            debugger;
            $scope.allUsersList = usersList[0].usersList;
        });
    };

    $scope.updateUser = function (user) {
        $scope.section = 3;
        $scope.updateuser = user;
        $scope.filterPractice = {};
        $scope.statusPracticeuser = false;
        $scope.currentUser = Auth.currentLoggedinUser();
    };


    $scope.saveEditUser = function () {
        updateUser.update({ id: $scope.updateuser._id, data: $scope.updateuser }, function (response) {

        });

        $scope.updateStatus = true;
        setTimeout(function () { $('.label-success').slideUp(); }, 3000);
    }

    $scope.userTest = function () {
        $scope.section = 1;
        $scope.updateStatus = false;
    }

    $scope.removeUser = function (id) {
        var i = $scope.user.indexOf(id);
        if (i != -1) {
            $scope.user.splice(i, 1);
        }
        $scope.useralert.pop();
    }

    //Code for todoList

    //$scope.todos = [
    //{ text: 'learn angular', done: true },
    //{ text: 'build an angular app', done: false }];

    //$scope.addTodo = function () {
    //    $scope.todos.push({ text: $scope.todoText, done: false });
    //    $scope.todoText = '';
    //};

    //$scope.remaining = function () {
    //    var count = 0;
    //    angular.forEach($scope.todos, function (todo) {
    //        count += todo.done ? 0 : 1;
    //    });
    //    return count;
    //};

    //$scope.archive = function () {
    //    var oldTodos = $scope.todos;
    //    $scope.todos = [];
    //    angular.forEach(oldTodos, function (todo) {
    //        if (!todo.done) $scope.todos.push(todo);
    //    });
    //};

    if (!$scope.employeeList)
        $scope.employeeList = new Array;

    $scope.employeeList = [{ dob: "1991-09-19", doj: "1991-09-19", email: "Testing@testing.com", location: "Testing", name: "Test" }];
    $scope.addnewEmployee = function () {
        debugger;
        if ($scope.employeeList) {
            if ($scope.employeeList.length > 0) {
                $scope.employeeList.push($scope.newemployee);
                $scope.addEmployee = false;
                $scope.newemployee = '';
            }
            else {
                $scope.employeeList = new Array;
                $scope.employeeList.push($scope.newemployee);
                $scope.addEmployee = false;
                $scope.newemployee = '';
            }
        }
    };

    $scope.editEmployee = function (index) {
        debugger;
        $scope.addEmployee = true;
        $scope.newemployee = $scope.employeeList[index];
        $scope.employeeList.splice(index);
    };

    $scope.deleteEmployee = function (index) {
        debugger;
        $scope.newemployee = $scope.employeeList[index];
        $scope.employeeList.splice(index);
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
    }
});
