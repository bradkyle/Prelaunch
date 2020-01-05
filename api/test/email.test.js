const routes = require('../routes');


describe('GET /users', () => {
    
    it('should send email', (done) => {
        routes.sendEmail(
            1, 
            5, 
            "bradkyleduncan@gmail.com", 
            "bradkyleduncan@gmail.com",  
            'Welcome to Axiom!',
            done
        )
    })
  
  })