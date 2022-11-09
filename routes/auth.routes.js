// this file will act as the route for authorization and  authentication of rest  endpoints

//define the routes-rest endpoints for user registration
const authController = require('../controllers/auth.controller');
const {verifySignUp} = require('../middlewares');

module.exports =(app) => {

    // POST 127.0.0.1:8080/crm/api/v1/auth/signup
 
    app.post("/crm/api/v1/auth/signup",[verifySignUp.validateSignUpRequest],authController.signup);

    // signIn post 127.0.0.1:8080/crm/api/v1/auth/signin
    
    app.post("/crm/api/v1/auth/signin",authController.signIn);


}