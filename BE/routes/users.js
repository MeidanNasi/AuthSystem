const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();


// *** Getting current user ('my account' ) *** // 
router.get('/me', auth, async (req, res) => {
    // we got the id of the user from the jwt.
    const user = await User.findById(req.user._id).select('-password'); // excluding of password prop for security reasons.
    res.send(user);
});



 // *** Register a new user *** //
router.post('/', async (req, res) => {
    //checking if joy returned error.. (validation failed)

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    //checking if user is alredy registered
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    // hashing password and saving user in the db
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res
        .header('x-auth-token', token)
        .header("access-control-expose-headers", "x-auth-token")
        //.send(_.pick(user, ['_id', 'name', 'email']));
        .send(token);
});

// logging out should happen in the client side, just delete the jwt and redirect user to login form.

module.exports = router; 
