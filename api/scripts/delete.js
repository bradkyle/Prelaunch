routes = require('../routes.js');

routes.USER.deleteTable(function(err) {
    if (err) {
        console.log('Error creating tables: ', err);
    } else {
        console.log('Tables has been destroyed');
    }
  });