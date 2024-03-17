var express = require("express");
var app = express();
var port = process.env.port || 3000;

app.listen(port, () => {
    console.log("App listening on: "+port)
});

const addTwoNumber = (n1, n2) => {
    return n1 + n2;
};

app.get("/addTwoNumber/:n1/:n2", (req, res) => {
    const n1 = parseInt(req.params.n1);
    const n2 = parseInt(req.params.n2);
    const result = addTwoNumber(n1, n2);
    res.json({statuscode:200, data: result});
});