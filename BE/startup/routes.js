const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const corsAccess = require('../middleware/access');

module.exports = function(app) {
app.use(corsAccess);  
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);
}