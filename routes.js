
const express = require("express");
const expressRouter=express.Router();
const db = require("./dbConnection");
const { signupValidation, loginValidation } = require("./validator");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const routerWeb = require("./Routes/webDataRoutes/router");
const routerInteractive=require("./Routes/userIntercationRoutes/routerUserInteraction")
const routesInteractive=routerInteractive(db,expressRouter,signupValidation,loginValidation,validationResult,bcrypt,jwt);
const routesWeb=routerWeb(db,expressRouter,signupValidation,loginValidation,validationResult,bcrypt,jwt);

module.exports={routesInteractive,routesWeb}