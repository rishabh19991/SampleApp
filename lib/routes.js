'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session');
var middleware = require('./middleware');
var practice = require('./practice');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


/**
 * Application routes
 */
module.exports = function (app) {
    app.get('/api/users/page/:pagenum', middleware.auth, users.list);    
    app.put('/api/users/update/:id', middleware.auth, users.updateUser);
    app.get('/api/users/uniqueemail/:email', users.uniqueemail);
    app.get('/api/users/uniquename/:username', users.uniquename);
    app.post('/api/users/save', users.create);    

    // For all Login related API calls
    app.post('/api/session', practice.authenticate, session.login);
    app.del('/api/session', session.logout);

    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', middleware.setUserCookie, index.index);
};