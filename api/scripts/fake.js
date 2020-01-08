

var faker = require('faker');
console.log(JSON.stringify({
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
}))