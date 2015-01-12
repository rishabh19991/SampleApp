//'use strict';

//var mongoose = require('mongoose'),
//    User = mongoose.model('User'),
//    Thing = mongoose.model('Thing');

///**
// * Populate database with sample application data
// */

////Clear old things, then add things in
//Thing.find({}).remove(function () {
//    Thing.create({
//            name: 'HTML5 Boilerplate',
//            info: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
//            awesomeness: 10
//        }, {
//            name: 'AngularJS',
//            info: 'AngularJS is a toolset for building the framework most suited to your application development.',
//            awesomeness: 10
//        }, {
//            name: 'Karma',
//            info: 'Spectacular Test Runner for JavaScript.',
//            awesomeness: 10
//        }, {
//            name: 'Express',
//            info: 'Flexible and minimalist web application framework for node.js.',
//            awesomeness: 10
//        }, {
//            name: 'MongoDB + Mongoose',
//            info: 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
//            awesomeness: 10
//        }, function () {
//            console.log('finished populating things');
//        }
//    );
//});

////Clear old users, then add a default user

//User.find({}).remove(function () {
//    User.create({
//            provider: 'local',
//            accounttype: 'provider',
//            otheraccounttype: '',
//            firstname: 'User',
//            lastname: 'test',
//            username: 'siteadmin',
//            email: 'siteadmin@test.com',
//            password: 'siteadmin',
//            question: '52f8e52c226f1c2b38272c68',
//            answer: 'Rugby',
//            practice: [
//                { 'name': 'ratefast', 'role': 'siteadmin', 'rolename': '', 'status': 'active' },
//                { 'name': 'ratefast12', 'role': 'siteadmin', 'status': 'active' },
//                { 'name': 'ratefast0', 'role': 'siteadmin', 'status': 'inactive' }
//            ],
//            profession: [],
//            speciality: []
//        },
//        {
//            provider: 'local',
//            accounttype: 'provider',
//            otheraccounttype: '',
//            firstname: 'User1',
//            lastname: 'test',
//            username: 'superadmin',
//            email: 'superadmin@test.com',
//            password: 'superadmin',
//            question: '52f8e52c226f1c2b38272c68',
//            answer: 'Rugby',
//            practice: [
//                { 'name': 'practicetest', 'role': 'superadmin', 'status': 'active' },
//                { 'name': 'practice0', 'role': 'superadmin', 'status': 'active' },
//                { 'name': 'practicerole', 'role': 'superadmin', 'status': 'active' },
//                { 'name': 'practicelevel', 'role': 'admin level4', 'status': 'active' }
//            ],
//            profession: [],
//            speciality: []
//        },
//        {
//            provider: 'local',
//            accounttype: 'provider',
//            otheraccounttype: '',
//            firstname: 'User',
//            lastname: 'test',
//            username: 'rishabh',
//            email: 'testing@testing.com',
//            password: 'rishabh',
//            question: '52f8e52c226f1c2b38272c68',
//            answer: 'Rugby',
//            practice: [
//                { 'name': 'practicelevel', 'role': 'admin level3', 'status': 'active' },
//                { 'name': 'practice0', 'role': 'superadmin', 'status': 'active' },
//                { 'name': 'practicerole', 'role': 'admin level1', 'status': 'active' },
//                { 'name': 'practice4', 'role': 'admin level3', 'status': 'active' }
//            ],
//            professionOther: 'test',
//            profession: ['md', 'do', 'dcm', 'other'],
//            otherprofession: 'Test',
//            licensenumber: '2342342',
//            speciality: []
//        },
//        {
//            provider: 'local',
//            accounttype: 'attorney',
//            otheraccounttype: 'Court Of Goa',
//            firstname: 'User',
//            lastname: 'test',
//            username: 'Rishabhs',
//            email: 'user@testing.com',
//            password: 'Rishabhs',
//            question: '52f8e52c226f1c2b38272c68',
//            answer: 'Rugby',
//            practice: [
//                { 'name': 'practicetest', 'role': 'nonadmin level3', 'status': 'active' },
//                { 'name': 'practice0', 'role': 'admin level4', 'status': 'active' },
//                { 'name': 'practicerole', 'role': 'adminlevel1', 'status': 'active' },
//                { 'name': 'practice4', 'role': 'admin level3', 'status': 'active' }
//            ],
//            professionOther: 'test',
//            profession: ['md', 'do', 'dcm', 'other'],
//            otherprofession: 'Test',
//            licensenumber: '2342342'

//        }, function () {
//            console.log('finished populating users');
//        }
//    );
//});


///*Practice.find({}).remove(function () {
// Practice.create({
// name: "Brock Clinic",
// practicename: "practice1",
// status: "active"
// },
// {
// name: "Rate Fast",
// practicename: "ratefast",
// status: "active"
// },
// {
// name: "Practice Test",
// practicename: "practicetest",
// status: "active"
// },
// {
// name: "Bryan Clinic",
// practicename: "practicelevel",
// status: "active"
// },
// {
// name: "Shield Clinic",
// practicename: "practice3",
// status: "active"
// },
// {
// name: "Batista Clinic",
// practicename: "practice4",
// status: "registered"
// },
// {
// name: "Rock Clinic",
// practicename: "practice5",
// status: "inactive"
// },
// {
// name: "Shamrock Clinic",
// practicename: "practice6",
// status: "inactive"
// },
// {
// name: "Amit. Dehradun. Hinduja National Hospital & Medical",
// practicename: "practice7",
// status: "active"
// },
// {
// name: "Rey Clinic",
// practicename: "practice8",
// status: "active"
// },
// {
// name: "Angel Clinic",
// practicename: "practice9",
// status: "inactive"
// },
// {
// name: "Boy Clinic",
// practicename: "practice10",
// status: "active"
// },
// {
// name: "Kane Clinic",
// practicename: "practice11",
// status: "active"
// },
// {
// name: "Khali Clinic",
// practicename: "practice12",
// status: "active"
// },
// {
// name: "Big Clinic",
// practicename: "practice13",
// status: "active"
// },
// {
// name: "White Clinic",
// practicename: "practice14",
// status: "active"
// },
// {
// name: "Shawn Clinic",
// practicename: "practice15",
// status: "active"
// },
// {
// name: "Micheals Clinic",
// practicename: "practice16",
// status: "active"
// },
// {
// name: "Chris Clinic",
// practicename: "practice17",
// status: "active"
// },
// {
// name: "Curtis Clinic",
// practicename: "practice18",
// status: "active"
// },
// {
// name: "Axel Clinic",
// practicename: "practice19",
// status: "active"
// },
// {
// name: "Axel Clinic",
// practicename: "practice0",
// status: "active"
// },
// {
// name: "Austin Clinic",
// practicename: "practice20",
// status: "active"
// }, function () {
// console.log('finished populating Practices');
// }
// );
// });*/


//Template.find({}).remove(function () {
//    Template.create({
//            "name": "Registration",
//            "subject": "Welcome to Rate Fast - Registration",
//            "dataMsg": "<b>Hi {username},</b><br/><br/> You have successfuly Registered on RateFast <br/><br/>Click on the below link to activate your account<br>{link}"
//        },
//        {
//            "name": "ForgotPassword",
//            "subject": "Password Reset",
//            "dataMsg": "Please use this link to change password {link}"
//        },
//        {
//            "name": "ForgotUsername",
//            "subject": "please find your rate-fast username.",
//            "dataMsg": "<b>Hello,</b><br/><br/> your rate-fast username is  {username}<br/><br/>Thank you"
//        },
//        {
//            "name": "InviteNewuser",
//            "subject": "Invitation To Join Rate Fast",
//            "dataMsg": "<b>Hi, </b><br/> You have invitation To join RateFast, Click on the below link to Accept<br><a href='{link}'>Accept</a> <br/>Thank you"
//        },
//        {
//            "name": "InviteExcitinguser",
//            "subject": "Invitation To Join Rate Fast",
//            "dataMsg": "<b>Hi, </b><br/> You have invitation To join RateFast, Click on the below link to Accept<br><a href='{link}'>Accept</a> <br/>Thank you"
//        },
//        function () {
//            console.log('finished populating Templates');
//        }
//    );
//});

//Speciality.find({}).remove(function () {
//    Speciality.create(
//        {
//            "title": 'Allergy and Immunology',
//            "accounttype": "provider"

//        },
//        {
//            "title": 'Anesthesiology',
//            "accounttype": "provider"

//        },
//        {
//            "title": 'Chiropractic',
//            "accounttype": "provider"
//        },
//        {
//            "title": 'Dermatology',
//            "accounttype": "provider"
//        },
//        {
//            "title": 'Emergency Medicine', "accounttype": "provider"
//        },
//        {
//            "title": 'Family Medicine', "accounttype": "provider"
//        },
//        {
//            "title": 'Family Medicine/Sports Medicine', "accounttype": "provider"
//        },
//        {
//            "title": 'Internal Medicine', "accounttype": "provider"
//        },
//        {
//            "title": 'Internal Medicine/Cardiology', "accounttype": "provider"
//        },
//        {
//            "title": 'Internal Medicine/Pulmonary Disease', "accounttype": "provider"
//        },
//        {
//            "title": 'Internal Medicine/Rheumatology', "accounttype": "provider"
//        },
//        {
//            "title": 'Internal Medicine/Sports Medicine', "accounttype": "provider"
//        },
//        {
//            "title": 'Neurology', "accounttype": "provider"
//        },
//        {
//            "title": 'Neurological Surgery', "accounttype": "provider"
//        },
//        {
//            "title": 'Obstetrics and Gynecology', "accounttype": "provider"
//        },
//        {
//            "title": 'Occupational Medicine', "accounttype": "provider"
//        },
//        {
//            "title": 'Occupational Medicine/ Medical Toxicology', "accounttype": "provider"
//        },
//        {
//            "title": 'Ophthalmology', "accounttype": "provider"
//        },
//        {
//            "title": 'Orthopedic Surgery', "accounttype": "provider"
//        },
//        {
//            "title": 'Orthopedic Surgery/Orthopedic Sports Medicine', "accounttype": "provider"
//        },
//        {
//            "title": 'Orthopedic Surgery/Surgery of the Hand', "accounttype": "provider"
//        },
//        {
//            "title": 'Otolaryngology', "accounttype": "provider"
//        },
//        {
//            "title": 'Physical Medicine and Rehabilitation', "accounttype": "provider"
//        },
//        {
//            "title": 'Physical Medicine and Rehabilitation/ Pain Medicine', "accounttype": "provider"
//        },
//        {
//            "title": 'Plastic Surgery', "accounttype": "provider"
//        },
//        {
//            "title": 'Plastic Surgery/ Plastic Surgery Within the Head and Neck', "accounttype": "provider"
//        },
//        {
//            "title": 'Plastic Surgery/ Surgery of the Hand', "accounttype": "provider"
//        },
//        {
//            "title": 'Podiatry', "accounttype": "provider"
//        },
//        {
//            "title": 'Psychiatry', "accounttype": "provider"
//        },
//        {
//            "title": 'Psychiatry/ Addiction Psychiatry', "accounttype": "provider"
//        },
//        {
//            "title": 'Public Health and General Preventive Medicine', "accounttype": "provider"
//        },
//        {
//            "title": 'Surgery', "accounttype": "provider"
//        },
//        {
//            "title": 'Surgery/Surgery of the Hand', "accounttype": "provider"
//        },
//        {
//            "title": 'Thoracic and Cardiac Surgery', "accounttype": "provider"
//        },
//        {
//            "title": 'Urology', "accounttype": "provider"
//        },
//        {
//            "title": 'Paralegal', "accounttype": "attorney"
//        },
//        {
//            "title": 'Esquire', "accounttype": "attorney"
//        },
//        {
//            "title": 'Other', "accounttype": "provider"
//        },
//        function () {
//            console.log('finished populating specialities');
//        }
//    );
//});
