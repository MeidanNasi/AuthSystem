const winston = require('winston');
require('express-async-errors');
//require('winston-mongodb');


module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );
  
    process.on('unhandledRejection', (ex) => {
      throw ex;
    });

  // saves all logs into a file in proj folder.
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  winston.add(new winston.transports.Console({
    format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple())}));

  // saves all logs into a file in db.
    //   winston.add(winston.transports.MongoDB, { 
    //     db: 'URL to connect db',
    //     level: 'info'
    //   });      
}