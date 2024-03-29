const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const {routesWeb,routesInteractive} = require('./routes.js');
const apicache = require('apicache');
let cache = apicache.middleware;
const app = express();
const https = require("https");
const fs = require("fs");

const options={
  key: fs.readFileSync("./keys/key.pem"),
      cert: fs.readFileSync("./keys/server.crt"),
}

const apps=https.createServer(options,app);
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
var __dirname = path.resolve();

 

app.use('/Resources',express.static('Resources'));

app.use(express.json());
 
app.use(bodyParser.json());
 app.use(cache('5 minutes'))
app.use(bodyParser.urlencoded({
    extended: true
}));
 

 
app.use('/api', routesWeb);
app.use('/userInteraction',routesInteractive);
 app.get('/',(req,res) => {
   res.status(200).send('AMHARA BANK BACK END API DEVELOPMENT');
 })
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});
 
apps.listen(3000,() => console.log(__dirname));