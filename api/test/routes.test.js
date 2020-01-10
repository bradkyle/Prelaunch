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

});