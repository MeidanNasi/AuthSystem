const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    const uri = "mongodb+srv://admin:Aa12345678@authcluster-fy56b.mongodb.net/authTest?retryWrites=true&w=majority";
    mongoose.connect(uri , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true  })
      //.then(() => console.log('Connected to MongoDB...'))
      .then(() => winston.info('Connected to MongoDB...'));
     
}