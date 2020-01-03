routes = require('../routes.js');

routes.dynamo.createTables(function(err) {
    if (err) {
        console.log('Error creating tables: ', err);
    } else {
        console.log('Tables has been created');
    }
  });