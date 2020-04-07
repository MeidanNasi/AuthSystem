const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const corsAccess = require('./middleware/access');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.' );
  process.exit(1);
}

const uri = "mongodb+srv://admin:Aa12345678@authcluster-fy56b.mongodb.net/authTest?retryWrites=true&w=majority";
mongoose.connect(uri , { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
 

app.use(corsAccess);  
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(function(err,req,res,next){

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));