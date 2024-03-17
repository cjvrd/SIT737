var express = require("express"); //specifies using express module
var app = express();
var port = process.env.port || 3000; //defines port to run server on

app.listen(port, () => { //tells express whihc port to listen on and logs when started
    console.log("App listening on: "+port) 
});

const addTwoNumber = (n1, n2) => { //function to add two numbers
    return n1 + n2;
};

app.get("/addTwoNumber/:n1/:n2", (req, res) => { //get request, which takes passes in 2 params in the url and calls addtwonumbers function eg. http://localhost:3000/addTwoNumber/234/234
    const n1 = parseInt(req.params.n1);
    const n2 = parseInt(req.params.n2);
    const result = addTwoNumber(n1, n2);
    res.json({statuscode:200, data: result}); //returns result of addtwo numbers function and status code as json
});