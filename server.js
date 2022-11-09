const express = require('express');
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/ticket.routes')(app);

/**
 * start the express server
 */
mongoose.connect(dbConfig.DB_URL,()=>{
     console.log("MongoDB connected");
     //initialization
     init();
})  

async function init() {
    //create admin user
    var user = await User.findOne({userId:"admin"});
    if(user){
        return;
    }
    else{
    
    const user = await User.create({
        name:"Vish",
        userId:"admin",
        email:"payelharish953@gmail.com",
        userType:"ADMIN",
        password:bcrypt.hashSync("Welcome01234",8)
    }); 
    console.log("Admin is created successfully");
    }
}
//let PORT=8081
console.log(process.env.PORT);
app.listen(serverConfig.PORT,() =>{
    
    console.log('application has started on the port',serverConfig.PORT);


})

