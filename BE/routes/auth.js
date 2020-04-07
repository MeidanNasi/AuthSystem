const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



// *** Login user *** //
router.post('/', async (req, res) =>
 {
  // validation of user parameters.
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // a checking if user is existing in db.
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  // validation of user password.
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  // generating a jwt and send it to client.
  const token = user.generateAuthToken();
  res.send(token);
});

// ** help validation function ** //
function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router; 
