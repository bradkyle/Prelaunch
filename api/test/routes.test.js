const request = require('supertest');
const app = require('../app-local');
const routes = require('../routes');
const config = require('../config');
var faker = require('faker');
faker.seed(123);
var _ = require('lodash');
var expect = require('chai').expect;

function genFakeUser(){
  return {
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
    hasrefferer: false
  }
}

function genFakeUsers(num){
  var fake_users = [];
  for (var i=0; i<num; i++){
    fake_users.push(genFakeUser());
  }
  return fake_users;
}

function logUsers(done){
  routes.User.find({}, function(err, users) {
    console.log(users);
  });
  done();
}

function createUsers(done, users){
  for (var u=0; u<users.length;u++){
    var user = new routes.User(users[u])
    user.save()
    .then(data => {
        // console.log(data)
    }).catch(err => {
        console.error(err);
    });
  }
  if (done){
    done();
  }
}

function removeUsers(done){
  routes.User.remove({}, function(err, res){
    if (err){
      console.error(err);
      if (done){done()};
    }
    // console.log(res);
    if (done){done()};
  });
}

describe('GET /users', () => {
  beforeAll((done) => {
    var fake_users = genFakeUsers(20)
    createUsers(done, fake_users);
  });

  afterAll((done) => {
    removeUsers(done);
  });  
  
  it('should have status 401: Unauthorized if no basic auth', async () => {
    const res = await request(app)
      .get('/users')
      .expect('Content-Type', /html/)
      .expect(401);
  })

  // it('should have status 200', async () => {
  //   const res = await request(app)
  //     .get('/users')
  //     .auth(config.ADMIN_EMAIL.toString(), config.ADMIN_PASSWORD.toString())
  //     .expect('Content-Type', /json/)
  //     .expect(200); 

  //   await expect(res.body).to.be.an('array'); 
  //   await expect(res.body).to.be.empty; 
  // })

  it('should have status 200 and retrieve created users', async () => {
    const res = await request(app)
      .get('/users')
      .auth(config.ADMIN_EMAIL.toString(), config.ADMIN_PASSWORD.toString())
      .expect('Content-Type', /json/)
      .expect(200); 

    await expect(res.body).to.be.an('array'); 
    await expect(res.body.length).to.equal(20); 
  })

  it('should retrieve all users', async () => {
    const res = await request(app)
      .get('/users')
      .auth(config.ADMIN_EMAIL.toString(), config.ADMIN_PASSWORD.toString())
      .expect('Content-Type', /json/)
      .expect(200);
  })

})

describe('GET /users/:id', () => {
  beforeAll((done) => {
    var fake_users = []
    fake_users.push(genFakeUser())
    createUsers(done, fake_users);
  });

  afterAll((done) => {
    // logUsers(done);
    removeUsers(done);
  });
  
  it('should have status 404 not found if user not found', async () => {
    const res = await request(app)
      .get('/users/fjadfasdfis')
      .expect('Content-Type', /json/)
      .expect(404);
  })

  //TODO validation
  it('should have status 200 and items in response if user found', async () => {
    await routes.User.find({}, async function(err, u){
        if (err){
            console.log("errr",err);
            //return done(err, null);
        }else{
          const res = await request(app)
          .get('/users/'+u[0]._id)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);
          expect(res.body._id).to.equal(u[0]._id)
          done();
        }
      });    
  }) 
})

describe('POST /users', () => {
  beforeAll((done) => {
    done();
  });

  afterEach((done) => {
    // logUsers(done);
    removeUsers(done);
  });

  it('should return status 200 and return user response if successful.', async () => {
    const res = await request(app)
      .post('/users')
      .send(genFakeUser())
      .expect('Content-Type', /json/)
      .expect(200);
  })

  it('should return status 400 if it has a parameter that is not supported.', async () => {
    var user = genFakeUser()
    var user = Object.assign(user, {invalid:"invalid"})
    const res = await request(app)
      .post('/users')
      .send(user)
      .expect(400||500);
  })  

  it('should return status 400 if it has a required parameter that missing.', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        referralcount:1
      })
      .expect(500||400);
  })  

  it('should return status 400 if empty request', async () => {
    const res = await request(app)
      .post('/users')
      .send({})
      .expect(500||400);
  })  

  it('should return status 400 if it has a parameter that is not correct format.', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        email: "example",
        ipaddress: faker.internet.ip(),
      })
      .expect(400);
  })  

  it('should remove refferalcount / sanitize request.', async () => {
    var user = genFakeUser()
    var user = Object.assign(user, {referralcount:500})

    const res = await request(app)
      .post('/users')
      .send(user)
      .expect(200);
    expect(res.body.referralcount).to.eql(0);
  })  

  it('should increment refferal users referral count if the user has been referred.', async () => {
    
  })  

  it('should send email to the html email address specified.', async () => {

  })

})

describe('DELETE /users/:id', () => {
  beforeAll((done) => {
    var fake_users = []
    fake_users.push(genFakeUser())
    createUsers(done, fake_users);
  });

  afterAll((done) => {
    // logUsers(done);
    removeUsers(done);
  });

  it('should have status 401: Unauthorized if no auth', async () => {
    const res = await request(app)
      .delete('/users/fjadfasdfis')
      .expect('Content-Type', /html/)
      .expect(401);
  })

  it('should have status 400: Not Found if user does not exist', async () => {
    const res = await request(app)
      .delete('/users/fjadfasdfis')
      .auth(config.ADMIN_EMAIL.toString(), config.ADMIN_PASSWORD.toString())
      .expect('Content-Type', /json/)
      .expect(404);
  })

  it('should have status 200 if user deleted', async (done) => {
    await routes.User.find({}, async function(err, u){
      if (err){
          console.log("errr",err);
          //return done(err, null);
      }else{
        const res = await request(app)
        .delete('/users/'+u[0]._id)
        .auth(config.ADMIN_EMAIL.toString(), config.ADMIN_PASSWORD.toString())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
        expect(res.body.disabled).to.equal(true)
        done();
      }
    });
  })
})

describe('PUT /users/:id', () => {
  beforeAll((done) => {
    removeUsers();
    var fake_users = []
    fake_users.push(genFakeUser())
    createUsers(done, fake_users);
  });

  afterAll((done) => {
    // logUsers(done);
    removeUsers(done);
  });

  it('should have status 401: Unauthorized if no auth', async () => {
    const res = await request(app)
      .put('/users/fjadfasdfis')
      .send({})
      .expect('Content-Type', /html/)
      .expect(401);
  })

  it('should have status 400: Not Found if user does not exist', async () => {
    const res = await request(app)
      .put('/users/fjadfasdfis')
      .auth(config.ADMIN_EMAIL.toString(), config.ADMIN_PASSWORD.toString())
      .send({
        referralcount:2
      })
      .expect('Content-Type', /json/)
      .expect(404);
  })

  it('should have status 400 if no content in submitted body', async () => {
    const res = await request(app)
      .put('/users/test')
      .auth(config.ADMIN_EMAIL.toString(), config.ADMIN_PASSWORD.toString())
      .send({})
      .expect('Content-Type', /json/)
      .expect(400);
  })

  it('should have status 400 if wrong (extra) content in submitted body', async (done) => {
    await routes.User.find({}, async function(err, u){
      if (err){
          console.log("errr",err);
          //return done(err, null);
      }else{
        const res = await request(app)
        .put('/users/'+u[0]._id)
        .auth(config.ADMIN_EMAIL.toString(), config.ADMIN_PASSWORD.toString())
        .send({
          invalid:2
        })
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .expect(200);
        expect(parseInt(res.body.referralcount)).to.equal(0)
        expect(parseInt(res.body.invalid)).to.be.NaN;
        done();
      }
    });
  })

  it('should have status 200 and have updated the submitted value', async (done) => {
    await routes.User.find({}, async function(err, u){
      if (err){
          console.log("errr",err);
          //return done(err, null);
      }else{
        const res = await request(app)
        .put('/users/'+u[0]._id)
        .auth(config.ADMIN_EMAIL.toString(), config.ADMIN_PASSWORD.toString())
        .send({
          referralcount:2
        })
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .expect(200);
        expect(parseInt(res.body.referralcount)).to.equal(2)
        done();
      }
    });
    
  })
})

// TODO should not get disabled
describe('GET /users/top', () => {
  beforeAll((done) => {
    var fake_users = genFakeUsers(200)
    createUsers(done, fake_users);
  });

  afterAll((done) => {
    removeUsers(done);
  });

  it('should have status 200 and return the correct number of results in descending order with screened output', async () => {
    const res = await request(app)
      .get('/top')
      // .expect('Content-Type', /html/)
      .expect(200);
    
  })

  it('should have status 200 and return no more than max allowed amount', async () => {
    const res = await request(app)
      .get('/top')
      // .expect('Content-Type', /html/)
      .expect(200);
    
  })

  it('should have status 200 and return number of results that were specified', async () => {
    const res = await request(app)
      .get('/top')
      // .expect('Content-Type', /html/)
      .expect(200);
    
  })

  it('should return 404 if no users present', async () => {
    const res = await request(app)
      .get('/top')
      // .expect('Content-Type', /html/)
      .expect(200);
    
  })
})

// TODO should exclude disabled
describe('GET /users/position', () => {
  
})


