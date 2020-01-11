var request = require('supertest');
var app = require('../app-local');
var config = require('../config');
var faker = require('faker');
faker.seed(123);
var _ = require('lodash');
var expect = require('chai').expect;
var sinon = require('sinon');
var routes = require('../routes');
const Email=require('../email.js');

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

async function createUsers(done, users){
    for (var u=0; u<users.length;u++){
        var user = new routes.User(users[u])
        await user.save()
        .then(data => {
            // console.log(data)
        }).catch(err => {
            console.error(err);
        });
    }
    var count = await routes.User.count();
    if (done){
        done();
    }
}

async function removeUsers(done){
    await routes.User.remove({}, function(err, res){
        if (err){
        console.error(err);
        if (done){done()};
        }
        // console.log(res);
        if (done){done()};
    });
}

describe('GET /users', () => {
    beforeAll(async (done) => {
        var fake_users = genFakeUsers(20);
        await removeUsers();
        await createUsers(done, fake_users);
    });

    afterAll(async (done) => {
        await removeUsers(done);
    });  

    it('should have status 401: Unauthorized if no basic auth', async (done) => {
        const res = await request(app)
            .get('/users/all');
        expect(res.statusCode).to.eql(401);
        done();
    })

    it('should have status 200 and retrieve created users', async (done) => {
        const res = await request(app)
        .get('/users/all')
        .auth(config.ADMIN_USERNAME.toString(), config.ADMIN_PASSWORD.toString());

        await expect(res.body).to.be.an('array'); 
        await expect(res.body.length).to.equal(20);
        await expect(res.statusCode).to.equal(200);  
        done()
    })

    it('should retrieve all users', async (done) => {
        const res = await request(app)
        .get('/users/all')
        .auth(config.ADMIN_USERNAME.toString(), config.ADMIN_PASSWORD.toString());
        await expect(res.statusCode).to.equal(200); 
        done()
    });

    // TODO should not get disabled
});


describe('POST /users', () => {
    beforeAll(async (done) => {
        var fake_users = genFakeUsers(20);
        await removeUsers();
        await createUsers(done, fake_users);
    });

    afterAll(async (done) => {
        // logUsers(done);
        await removeUsers(done);
    });

    afterEach((done) => {
        sinon.restore();
        done();
    });

    it('should return status 200 and return user response if successful.', async (done) => {
        stub = sinon.stub(Email.prototype, 'send');
        const res = await request(app)
        .post('/users')
        .send(genFakeUser());
        await expect(res.statusCode).to.equal(200);
        expect(stub.called).to.eql(true);
        done();
    })

    it('should return status 400 if it has a parameter that is not supported.', async (done) => {
        var user = genFakeUser()
        var user = Object.assign(user, {invalid:"invalid"})
        const res = await request(app)
        .post('/users')
        .send(user);
        await expect(res.statusCode).to.be.within(400,500);
        done();
    }); 

    it('should return status 400 if it has a required parameter that missing.', async (done) => {
        const res = await request(app)
        .post('/users')
        .send({
            referralcount:1
        });

        await expect(res.statusCode).to.be.within(400,500);
        done();
    });

    it('should return status 400 if empty request', async (done) => {
        const res = await request(app)
        .post('/users')
        .send({});

        await expect(res.statusCode).to.be.within(400,500);
        done();
    });  

    it('should return status 400 if it has a parameter that is not correct format.', async (done) => {
        const res = await request(app)
        .post('/users')
        .send({
            email: "example",
            ipaddress: faker.internet.ip(),
        });

        await expect(res.statusCode).to.be.within(400,500);
        done();
    }); 

    it('should remove refferalcount / sanitize request.', async (done) => {
        stub = sinon.stub(Email.prototype, 'send');
        var user = genFakeUser();
        var user = Object.assign(user, {referralcount:500})
        const res = await request(app)
            .post('/users')
            .send(user);

        expect(res.statusCode).to.equal(200);
        expect(res.body.referralcount).to.eql(0);
        expect(stub.called).to.eql(true);
        stub.restore();
        done();
    })  

    it('should increment refferal users referral count if the user has been referred.', async (done) => {
        stub = sinon.stub(Email.prototype, 'send');
        var ruser = genFakeUser();
        var ruser = Object.assign(ruser, {referralcount:0})
        const res = await request(app)
            .post('/users')
            .send(ruser);

        if (res.statusCode==200){
            ruser = res.body
            var user = genFakeUser();
            var user = Object.assign(user, {referrerid:ruser._id})
            const res1 = await request(app)
                .post('/users')
                .send(user);
            
            expect(res.statusCode).to.equal(200);
            expect(stub.called).to.eql(true);

            const res2 = await request(app)
                .get('/users/find?id='+ruser._id);

            expect(res.statusCode).to.equal(200);
            expect(res2.body._id.toString()).to.eql(ruser._id.toString());
            expect(parseInt(res2.body.referralcount)).to.eql(1);
            stub.restore();
            
            done();
        } else {
            stub.restore();
            done.fail(new Error('This is the error'));
        }
    });

    it('Should still add user if referral is not valid.', async (done) => {
        stub = sinon.stub(Email.prototype, 'send');
        expect(stub.called).to.eql(false);
        var user = genFakeUser();
        var user = Object.assign(user, {referrerid:"dioasdjfiasdhfasd"})
        const res1 = await request(app)
            .post('/users')
            .send(user);

        expect(stub.called).to.eql(true);
        expect(res1.statusCode).to.eql(200);
        done();
    });

    //check required fields not provided
});


describe('GET /users/find?(email/id)', () => {
    beforeAll((done) => {
        var fake_users = []
        fake_users.push(genFakeUser())
        createUsers(done, fake_users);
    });

    afterAll((done) => {
        // logUsers(done);
        removeUsers(done);
    });

    it('should have status 404 not found if user not found /users/find?id=fjadfasdfis', async (done) => {
        const res = await request(app)
        .get('/users/find?id=fjadfasdfis');

        expect(res.statusCode).to.eql(404);
        done();
    });

    it('should have status 400 invalid email: bad request', async (done) => {
        const res = await request(app)
        .get('/users/find?email=fjadfasdfis');

        expect(res.statusCode).to.eql(400);
        done();
    });

    it('should have status 404 email not found', async (done) => {
        const res = await request(app)
        .get('/users/find?email=fjadfasdfdis@gmail.com');

        expect(res.statusCode).to.eql(404);
        done();
    });

    //TODO validation
    it('should have status 200 and items in response if user found', async (done) => {
        await routes.User.find({}, async function(err, u){
            if (err){
                console.log("errr",err);
                //return done(err, null);
            }else{
                var x = await(u)[0]._id
                const res = await request(app)
                .get('/users/find?id='+x)
                .set('Accept', 'application/json');
                expect(res.statusCode).to.eql(200);
                expect(res.body._id.toString()).to.equal(u[0]._id.toString());
                done();
            }
        });    
    }); 
});

describe('DELETE /users:id', () => {
    beforeAll((done) => {
        var fake_users = []
        fake_users.push(genFakeUser())
        createUsers(done, fake_users);
    });

    afterAll((done) => {
        // logUsers(done);
        removeUsers(done);
    });

    it('should have status 401: Unauthorized if no auth on delete', async (done) => {
        const res = await request(app)
        .delete('/users/fjadfasdfis');
        expect(res.statusCode).to.equal(401); 
        done();
    })

    it('should have status 400: Not Found if user does not exist', async (done) => {
        const res = await request(app)
        .delete('/users/fjadfasdfis')
        .auth(config.ADMIN_USERNAME.toString(), config.ADMIN_PASSWORD.toString());

        expect(res.statusCode).to.equal(404); 
        done();
    })

    it('should have status 200 if user deleted', async (done) => {
        await routes.User.find({}, async function(err, u){
            if (err){
                console.log("errr",err);
                //return done(err, null);
                done.fail();
            }else{
                var x = u[0]._id
                const res = await request(app)
                .delete('/users/'+x)
                .auth(config.ADMIN_USERNAME.toString(), config.ADMIN_PASSWORD.toString());

                expect(res.statusCode).to.equal(200); 
                expect(res.body.disabled).to.equal(true);
                done();
            }
        });
    });
});

describe('DELETE /users:id', () => {
    beforeAll((done) => {
        var fake_users = []
        fake_users.push(genFakeUser())
        createUsers(done, fake_users);
    });

    afterAll((done) => {
        // logUsers(done);
        removeUsers(done);
    });

    it('should have status 401: Unauthorized if no auth on delete', async (done) => {
        const res = await request(app)
        .delete('/users/fjadfasdfis');
        expect(res.statusCode).to.equal(401); 
        done();
    })

    it('should have status 400: Not Found if user does not exist', async (done) => {
        const res = await request(app)
        .delete('/users/fjadfasdfis')
        .auth(config.ADMIN_USERNAME.toString(), config.ADMIN_PASSWORD.toString());

        expect(res.statusCode).to.equal(404); 
        done();
    })

    it('should have status 200 if user deleted', async (done) => {
        await routes.User.find({}, async function(err, u){
            if (err){
                console.log("errr",err);
                //return done(err, null);
                done.fail();
            }else{
                var x = u[0]._id
                const res = await request(app)
                .delete('/users/'+x)
                .auth(config.ADMIN_USERNAME.toString(), config.ADMIN_PASSWORD.toString());

                expect(res.statusCode).to.equal(200); 
                expect(res.body.disabled).to.equal(true);
                done();
            }
        });
    });
});


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

    afterEach((done) => {
        sinon.restore();
        done();
    });

    it('should have status 400: Not Found if user does not exist', async (done) => {
        const res = await request(app)
            .put('/users/fjadfasdfis')
            .send({referralcount:2});

        expect(res.statusCode).to.equal(400); 
        done();
    });

    it('should have status 400 if no content in submitted body', async (done) => {
        const res = await request(app)
            .put('/users/test')
            .send({});

        expect(res.statusCode).to.equal(400); 
        done();
    });

    it('should have status 400 if wrong (extra) content in submitted body', async (done) => {
        stub = sinon.stub(Email.prototype, 'send');
        var ruser = genFakeUser();
        var ruser = Object.assign(ruser, {referralcount:0})
        const res = await request(app)
            .post('/users')
            .send(ruser);

        if (res.statusCode==200){
            user = res.body
            
            const res1 = await request(app)
            .put('/users/'+user._id)
            .send({
                language: 'test',
                referralcount: 999,
                smlang:400
            })
            .set('Accept', 'application/json');

            resuser = await routes.User.findById(user._id);

            // .expect('Content-Type', /json/)
            expect(res1.statusCode).to.equal(400); 
            expect(parseInt(resuser.referralcount)).to.equal(0);
            stub.restore();            
            done();
        } else {
            stub.restore();
            done.fail(new Error('This is the error'));
        }        
    });

    it('Should have status 400 and have not updated the referral count directly\
        resulting in no updated parameters', async (done) => {
        stub = sinon.stub(Email.prototype, 'send');
        var ruser = genFakeUser();
        var ruser = Object.assign(ruser, {referralcount:0})
        const res = await request(app)
            .post('/users')
            .send(ruser);

        if (res.statusCode==200){
            user = res.body
            
            const res1 = await request(app)
            .put('/users/'+user._id)
            .send({
                referralcount: 999
            })
            .set('Accept', 'application/json');

            resuser = await routes.User.findById(user._id);

            // .expect('Content-Type', /json/)
            expect(res1.statusCode).to.equal(400); 
            expect(parseInt(resuser.referralcount)).to.equal(0);
            stub.restore();            
            done();
        } else {
            stub.restore();
            done.fail(new Error('This is the error'));
        }    
    });

    it('Should have status 200 for updating parameters and have not updated\
        the referral count directly.', async (done) => {
        stub = sinon.stub(Email.prototype, 'send');
        var ruser = genFakeUser();
        var ruser = Object.assign(ruser, {referralcount:0})
        const res = await request(app)
            .post('/users')
            .send(ruser);

        if (res.statusCode==200){
            user = res.body
            
            const res1 = await request(app)
            .put('/users/'+user._id)
            .send({
                language: 'test',
                referralcount: 999
            })
            .set('Accept', 'application/json');

            resuser = await routes.User.findById(user._id);

            // .expect('Content-Type', /json/)
            expect(res1.statusCode).to.equal(200); 
            expect(parseInt(resuser.referralcount)).to.equal(0);
            expect(resuser['language']).to.equal('test');
            stub.restore();            
            done();
        } else {
            stub.restore();
            done.fail(new Error('This is the error'));
        }    
    });

    it('should have status 200 and have updated the submitted value', async (done) => {
        stub = sinon.stub(Email.prototype, 'send');
        var ruser = genFakeUser();
        var ruser = Object.assign(ruser, {referralcount:0})
        const res = await request(app)
            .post('/users')
            .send(ruser);

        if (res.statusCode==200){
            user = res.body
            
            const res1 = await request(app)
            .put('/users/'+user._id)
            .send({
                language:"test"
            })
            .set('Accept', 'application/json');

            resuser = await routes.User.findById(user._id);

            // .expect('Content-Type', /json/)
            expect(res1.statusCode).to.equal(200); 
            expect(parseInt(resuser.referralcount)).to.equal(0);
            expect(resuser['language']).to.equal("test");
            stub.restore();            
            done();
        } else {
            stub.restore();
            done.fail(new Error('This is the error'));
        }      
    });
});


describe('GET /top', () => {
    beforeAll((done) => {
        removeUsers();
        var fake_users = []
        this.total = 10
        for (var x=0; x<this.total; x++){
            var user = genFakeUser()
            var user = Object.assign(user, {
                referralcount:x,
                disabled:x>=(this.total/2) ? true : false
            })
            fake_users.push(user);
        }
        createUsers(done, fake_users);
    });

    afterAll((done) => {
        // logUsers(done);
        removeUsers(done);
    });

    afterEach((done) => {
        sinon.restore();
        done();
    });

    it('should have status 200 and return the correct number of results \
        in descending order with screened output i.e. remove disabled etc.', async (done) => {
        const res = await request(app)
        .get('/top');

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array'); 
        expect(res.body.length).to.eql(this.total/2); 
        done();
        
    })
})

describe('GET /count', () => {
    beforeAll((done) => {
        removeUsers();
        var fake_users = []
        for (var x=0; x<10; x++){
            var user = genFakeUser()
            var user = Object.assign(user, {
                referralcount:x, 
                disabled:false
            })
            fake_users.push(user);
        }
        createUsers(done, fake_users);
    });

    afterAll((done) => {
        // logUsers(done);
        removeUsers(done);
    });

    afterEach((done) => {
        sinon.restore();
        done();
    });

    it('should get correct count.', async (done) => {
        const res = await request(app)
        .get('/count');

        expect(res.statusCode).to.equal(200);
        expect(res.body.count).to.eql(10); 
        done();
    })
})

describe('GET /count', () => {
    beforeAll((done) => {
        removeUsers();
        var fake_users = []
        for (var x=0; x<10; x++){
            var user = genFakeUser()
            var user = Object.assign(user, {
                referralcount:x, 
                disabled:false
            })
            fake_users.push(user);
        }
        createUsers(done, fake_users);
    });

    afterAll((done) => {
        // logUsers(done);
        removeUsers(done);
    });

    afterEach((done) => {
        sinon.restore();
        done();
    });

    it('should get correct count.', async (done) => {
        const res = await request(app)
        .get('/count');

        expect(res.statusCode).to.equal(200);
        expect(res.body.count).to.eql(10); 
        done();
    })
})

describe('GET /position/:id', () => {
    beforeAll((done) => {
        removeUsers();
        var fake_users = []
        for (var x=0; x<10; x++){
            var user = genFakeUser()
            var user = Object.assign(user, {
                referralcount:x, 
                disabled:false
            })
            fake_users.push(user);
        }
        createUsers(done, fake_users);
    });

    afterAll((done) => {
        // logUsers(done);
        removeUsers(done);
    });

    afterEach((done) => {
        sinon.restore();
        done();
    });

    it('should get correct count.', async (done) => {
        var users = await routes.User.find({});


        const res = await request(app)
        .get('/count');

        expect(res.statusCode).to.equal(200);
        expect(res.body.count).to.eql(10); 
        done();
    })
})