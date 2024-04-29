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


//change for task 6.2C
app.get("/", (req, res) => {
    const n1 = "<html><body><H1>HELLO THERE THIS IS MY CHANGE FOR TASK 6.2C </H1></body></html>";
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(n1));     
})