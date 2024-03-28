const express = require('express');
const router = express.Router(); //calling express router
const winston = require('winston'); //specifies using winston module

const logger = winston.createLogger({ //creates the winston logger and defines the logic
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculate-service' },
  transports: [
    //Write all logs with importance level of `error` or less to `error.log`
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    //Write all logs with importance level of `info` or less to `combined.log`
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

logger.add(new winston.transports.Console({ //logger
  format: winston.format.simple(),
}));

const calculate = (operation, n1, n2) => { //this function takes in the operation param from the endpoint (add, sub, mult, div) and two numbers, then performs arithmetic depending on inputs
  switch (operation) {
    case 'add':
      return n1 + n2;
    case 'subtract':
      return n1 - n2;
    case 'multiply':
      return n1 * n2;
    case 'divide':
      if (n2 === 0) { //handling divide by zero error
        logger.error("cannot divide by zero");
        throw new Error("cannot divide by zero");
      }
      return n1 / n2;
    default:
      throw new Error('Invalid operation');
  }
};

router.get("/:operation/:n1/:n2", (req, res) => { //endpoint that takes in the url params, passes them to the calculate function, then returns the result as json
  try {
    const operation = req.params.operation; //endpoints url params
    const n1 = parseFloat(req.params.n1);
    const n2 = parseFloat(req.params.n2);

    if (isNaN(n1)) { //NaN error handling
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }

    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }

    logger.info(`Parameters ${n1} and ${n2} received for ${operation}`); //logging each API call

    const result = calculate(operation, n1, n2); //calls function
    res.status(200).json({ statuscode: 200, data: result }); //returns result as json and status code

  } catch (error) { //error handling
    console.error(error)
    res.status(500).json({ statuscode: 500, msg: error.toString() })
  }
});

//BELOW IS CODE I HAD WRITTEN BEFORE COMPRESSING IT INTO THE ONE FUNCTION ABOVE

// const add = (n1, n2) => { //function to add two numbers
//   return n1 + n2;
// };

// const subtract = (n1, n2) => { //function to subtract two numbers
//   return n1 - n2;
// };

// const multiply = (n1, n2) => { //function to multiply two numbers
//   return n1 * n2;
// };

// const divide = (n1, n2) => { //function to divide two numbers
//   return n1 / n2;
// };

// router.get("/add/:n1/:n2", (req, res) => { //add endpoint, takes in url params and adds them eg. localhost:3000/add/5/3 would return json data with the result 8
//   try {
//     const n1 = parseFloat(req.params.n1);
//     const n2 = parseFloat(req.params.n2);

//     if (isNaN(n1)) { //error handling for NaN inputs
//       logger.error("n1 is incorrectly defined");
//       throw new Error("n1 incorrectly defined");
//     }

//     if (isNaN(n2)) {
//       logger.error("n2 is incorrectly defined");
//       throw new Error("n2 incorrectly defined");
//     }

//     logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');

//     const result = add(n1, n2);
//     res.status(200).json({ statuscode: 200, data: result });

//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ statuscode: 500, msg: error.toString() })
//   }
// });

// router.get("/subtract/:n1/:n2", (req, res) => { //works the same as other endpoints
//   try {
//     const n1 = parseFloat(req.params.n1);
//     const n2 = parseFloat(req.params.n2);

//     if (isNaN(n1)) {
//       logger.error("n1 is incorrectly defined");
//       throw new Error("n1 incorrectly defined");
//     }

//     if (isNaN(n2)) {
//       logger.error("n2 is incorrectly defined");
//       throw new Error("n2 incorrectly defined");
//     }

//     logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for subtraction');

//     const result = subtract(n1, n2);
//     res.status(200).json({ statuscode: 200, data: result });

//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ statuscode: 500, msg: error.toString() })
//   }
// });

// router.get("/multiply/:n1/:n2", (req, res) => { //works the same as other endpoints
//   try {
//     const n1 = parseFloat(req.params.n1);
//     const n2 = parseFloat(req.params.n2);

//     if (isNaN(n1)) {
//       logger.error("n1 is incorrectly defined");
//       throw new Error("n1 incorrectly defined");
//     }

//     if (isNaN(n2)) {
//       logger.error("n2 is incorrectly defined");
//       throw new Error("n2 incorrectly defined");
//     }

//     logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for multiplication');

//     const result = multiply(n1, n2);
//     res.status(200).json({ statuscode: 200, data: result });

//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ statuscode: 500, msg: error.toString() })
//   }
// });

// router.get("/divide/:n1/:n2", (req, res) => { //works the same as other endpoints with one exception, handling division by zero error
//   try {
//     const n1 = parseFloat(req.params.n1);
//     const n2 = parseFloat(req.params.n2);

//     if (isNaN(n1)) {
//       logger.error("n1 is incorrectly defined");
//       throw new Error("n1 incorrectly defined");
//     }

//     if (isNaN(n2)) {
//       logger.error("n2 is incorrectly defined");
//       throw new Error("n2 incorrectly defined");
//     }

//     if (n2 == 0) { //handles division by zero
//       logger.error("cannot divide by zero");
//       throw new Error("cannot divide by zero");
//     }

//     logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for division');

//     const result = divide(n1, n2);
//     res.status(200).json({ statuscode: 200, data: result });

//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ statuscode: 500, msg: error.toString() })
//   }
// });

module.exports = router;