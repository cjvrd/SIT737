const express = require("express"); //specifies using express module
const app = express();

const calculator = require('./calculator'); //router to calculator.js
app.use(express.json()); //middleware for express to handle json
app.use(express.urlencoded({ extended: true }));
app.use('/', calculator); //router function to route to endpoints

const port = process.env.port || 3000; //defines port to run server on
app.listen(port, () => { //tells express which port to listen on and logs when started
    console.log("App listening on: "+ port) 
});