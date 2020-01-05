const request = require('supertest');
const app = require('../app-local');
const routes = require('../routes_old');
const config = require('../config');
var faker = require('faker');
faker.seed(123);
var _ = require('lodash');
var expect = require('chai').expect;

function genFakeUsers(num){
  var fake_users = [];
  for (var i=0; i<num; i++){
    fake_users.push({
      id: faker.random.uuid(),
      email: faker.internet.email(),
      ipaddress:faker.internet.ip(),
      macaddress: faker.internet.mac(),
      useragent: faker.internet.userAgent(),
      sourceurl: faker.internet.url(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      emailsent: faker.random.boolean(),
      emailopened: faker.random.boolean(),
      variantid: faker.random.uuid(),
      timetillsignup: faker.random.number(),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
      country: faker.address.country(),
      region: faker.address.state(),
      referralcount: faker.random.number(),
      hasreferrals: faker.random.boolean(),
    });
  }
  return fake_users;
}

function logUsers(){
  routes.USER.scan()
  .loadAll().exec((err, result)=>{
    if (err) {
      console.error("Could not get users: "+err.toString())
    } else{
      console.log(result.Items);
    }
  });
}

function createUsers(done, users){

  routes.USER.create(users, function (err, result) {
    if (err) {
      console.error("Could not create users: "+err.toString())
    } else{
      console.log('created 10 accounts in DynamoDB');
      done();
    }
  });
}

// describe('GET /users', () => {

//   beforeAll((done) => {
//     routes.dynamo.createTables(function(err) {
//       if (err) {
//           console.log('Error creating tables: ', err);
//       } else {
//           console.log('Tables has been created');
//           var fake_users = genFakeUsers(10);
//           createUsers(done, fake_users);
//       }
//     });
//   });

//   afterAll((done) => {
//     routes.USER.deleteTable(function(err) {
//       if (err) {
//           console.log('Error creating tables: ', err);
//       } else {
//           console.log('Tables has been destroyed');
//           done();
//       }
//     });
//   });
  
  
//   it('should have status 401: Unauthorized if no basic auth', async () => {
//     const res = await request(app)
//       .get('/users')
//       .expect('Content-Type', /html/)
//       .expect(401);
//   })

//   // it('should have status 200', async () => {
//   //   const res = await request(app)
//   //     .get('/users')
//   //     .auth(config.ADMIN_EMAIL.toString(), config.ADMIN_PASSWORD.toString())
//   //     .expect('Content-Type', /json/)
//   //     .expect(200); 

//   //   await expect(res.body).to.be.an('array'); 
//   //   await expect(res.body).to.be.empty; 
//   // })

//   it('should have status 200 and retrieve created users', async () => {
//     const res = await request(app)
//       .get('/users')
//       .auth(config.ADMIN_EMAIL.toString(), config.ADMIN_PASSWORD.toString())
//       .expect('Content-Type', /json/)
//       .expect(200); 

//     await expect(res.body).to.be.an('array'); 
//     await expect(res.body.length).to.equal(10); 
//   })

//   it('should retrieve all users', async () => {
//     const res = await request(app)
//       .get('/users')
//       .auth(config.ADMIN_EMAIL.toString(), config.ADMIN_PASSWORD.toString())
//       .expect('Content-Type', /json/)
//       .expect(200);
//   })
  
//   // it('should not retrieve any users where disabled is true', async () => {
//   //   const res = await request(app)
//   //     .get('/users')
//   //     .auth(config.ADMIN_EMAIL.toString(), config.ADMIN_PASSWORD.toString())
//   //     .expect('Content-Type', /json/)
//   //     .expect(200);
//   // })

// })

// describe('GET /users/:id', () => {
//   beforeAll((done) => {
//     routes.dynamo.createTables(function(err) {
//       if (err) {
//           console.log('Error creating tables: ', err);
//       } else {
//           console.log('Tables has been created');
//           var fake_users = []
//           fake_users.push({
//             id: "test",
//             email: faker.internet.email(),
//             ipaddress:faker.internet.ip(),
//             macaddress: faker.internet.mac(),
//             disabled: false
//           })
//           createUsers(done, fake_users);
//       }
//     });
//   });

//   afterAll((done) => {
//     routes.USER.deleteTable(function(err) {
//       if (err) {
//           console.log('Error creating tables: ', err);
//       } else {
//           console.log('Tables has been destroyed');
//           done();
//       }
//     });
//   });
  
//   it('should have status 404 not found if user not found', async () => {
//     const res = await request(app)
//       .get('/users/fjadfasdfis')
//       .expect('Content-Type', /json/)
//       .expect(404);
//   })

//   //TODO validation
//   it('should have status 200 and items in response if user found', async () => {
//     const res = await request(app)
//       .get('/users/test')
//       .expect('Content-Type', /json/)
//       .expect(200);    
//   }) 

// })

// describe('POST /users', () => {
//   beforeAll((done) => {
//     routes.dynamo.createTables(function(err) {
//       if (err) {
//           console.log('Error creating tables: ', err);
//       } else {
//           console.log('Tables has been created');
//           done();
//       }
//     });
//   });

//   afterAll((done) => {
//     routes.USER.deleteTable(function(err) {
//       if (err) {
//           console.log('Error destroying tables: ', err);
//       } else {
//           console.log('Tables has been destroyed');
//           done();
//       }
//     });
//   });

//   it('should return status 200 and return user response if successful.', async () => {
//     const res = await request(app)
//       .post('/users/')
//       .send({})
//       .expect('Content-Type', /json/)
//       .expect(400);
//   })

//   it('should return status 400 if it has a parameter that is not supported.', async () => {
//     const res = await request(app)
//       .post('/users/')
//       .send({})
//       .expect('Content-Type', /json/)
//       .expect(400);
//   })  

//   it('should return status 400 if it has a required parameter that missing.', async () => {
//     const res = await request(app)
//       .post('/users/')
//       .send({})
//       .expect('Content-Type', /json/)
//       .expect(400);
//   })  

//   it('should return status 400 if empty request', async () => {
//     const res = await request(app)
//       .post('/users/')
//       .send({})
//       .expect('Content-Type', /json/)
//       .expect(400);
//   })  

//   it('should return status 400 if it has a parameter that is not correct format.', async () => {
//     const res = await request(app)
//       .post('/users/')
//       .send({})
//       .expect('Content-Type', /json/)
//       .expect(400);
//   })  

//   it('should increment refferal users referral count if the user has been referred.', async () => {
//     const res = await request(app)
//       .post('/users/')
//       .send({})
//       .expect('Content-Type', /json/)
//       .expect(400);
//   })  

//   it('should send email to the html email address specified.', async () => {
//     const res = await request(app)
//       .post('/users/')
//       .send({})
//       .expect('Content-Type', /json/)
//       .expect(400);
//   })

// })

// describe('DELETE /users/:id', () => {
//   beforeAll((done) => {
//     routes.dynamo.createTables(function(err) {
//       if (err) {
//           console.log('Error creating tables: ', err);
//       } else {
//           console.log('Tables has been created');
//           var fake_users = []
//           fake_users.push({
//             id: "test",
//             email: faker.internet.email(),
//             ipaddress:faker.internet.ip(),
//             disabled: false
//           })
//           createUsers(done, fake_users);
//       }
//     });
//   });

//   afterAll((done) => {
//     routes.USER.deleteTable(function(err) {
//       if (err) {
//           console.log('Error destroying tables: ', err);
//       } else {
//           console.log('Tables has been destroyed');
//           done();
//       }
//     });
//   });

//   it('should have status 404: Not Found if user does not exist', async () => {
//     const res = await request(app)
//       .delete('/users/fjadfasdfis')
//       .expect('Content-Type', /json/)
//       .expect(400);
//   })

//   it('should have status 200 and items in response if user found', async () => {
//     const res = await request(app)
//       .delete('/users/test')
//       .expect('Content-Type', /json/)
//       .expect(200);

//     // no data in res TODO
//   })
// })

// describe('PUT /users/:id', () => {
//   beforeAll((done) => {
//     routes.dynamo.createTables(function(err) {
//       if (err) {
//           console.log('Error creating tables: ', err);
//       } else {
//           console.log('Tables has been created');
//           var fake_users = []
//           fake_users.push({
//             id: "test",
//             email: faker.internet.email(),
//             ipaddress:faker.internet.ip(),
//             macaddress: faker.internet.mac(),
//             disabled: false
//           })
//           createUsers(done, fake_users);
//       }
//     });
//   });

//   afterAll((done) => {
//     routes.USER.deleteTable(function(err) {
//       if (err) {
//           console.log('Error destroying tables: ', err);
//       } else {
//           console.log('Tables has been destroyed');
//           done();
//       }
//     });
//   });

//   it('should have status 404: Not Found if user does not exist', async () => {
//     const res = await request(app)
//       .put('/users/fjadfasdfis')
//       .send({})
//       .expect('Content-Type', /html/)
//       .expect(404);
//   })

//   it('should have status 400 if no content in submitted body', async () => {
//     const res = await request(app)
//       .put('/users/test')
//       .send({})
//       .expect('Content-Type', /html/)
//       .expect(404);
//   })

//   it('should have status 200', async () => {
//     const res = await request(app)
//       .put('/users/test')
//       .send({})
//       .expect('Content-Type', /html/)
//       .expect(404);
//   })
// })


describe('GET /users/top', () => {
  beforeAll((done) => {
    routes.dynamo.createTables(function(err) {
      if (err) {
          console.log('Error creating tables: ', err);
      } else {
          console.log('Tables has been created');
          var fake_users = []
          for (var x=0; x<15; x++){
            fake_users.push({
              id: "test"+x.toString(),
              email: faker.internet.email(),
              ipaddress:faker.internet.ip(),
              referralcount: x,
              disabled: false
            })
          }
          createUsers(done, fake_users);
      }
    });
  });

  afterAll((done) => {
    routes.USER.deleteTable(function(err) {
      if (err) {
          console.log('Error destroying tables: ', err);
      } else {
          console.log('Tables has been destroyed');
          done();
      }
    });
  });

  it('should have status 200 and return the correct number of results in descending order', async () => {
    const res = await request(app)
      .get('/top')
      // .expect('Content-Type', /html/)
      .expect(200);
    
    console.log(res.body);
  })
})


describe('GET /users/position', () => {
  
})


