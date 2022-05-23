const express = require("express");
const router = express.Router();
const db = require("./dbConnection");
const { signupValidation, loginValidation } = require("./validator");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  courselAdd,
  courselDelete,
  courselImgUpdate,
  courselUpdate,
  getAllCoursel,
} = require("./Routes/coursel");
const upload = require("./Routes/middleWare/upload");
const {
  postBankStatus,
  getBankStatus,
  updateBankStatus,
} = require("./Routes/bankStatus");

const {
  deleteCurrencyInformation,
  createCurrencyInformation,
  updateCurrecnyInformation,
  getCurrencyInfo,
  updateCurrencyIcon
} = require("./Routes/exchangeRate");
const {
  addBranch,
  deleteBranch,
  getAllBranchs,
  updateBranch,
  getSpecificBranch,
} = require("./Routes/branch");
router.get("/", (req, res) => {
  res.send("working!");
  console.log("get working");
});

//Bank status path
router.post("/setBankStatus", signupValidation, (req, res, next) =>
  postBankStatus(req, res, next, db)
);
router.post("/updateBankStatus", signupValidation, (req, res, next) =>
  updateBankStatus(req, res, next, db)
);
router.get("/getBankStatus", (req, res) => getBankStatus(req, res, db));
//branch information path
router.post("/addBranch", signupValidation, (req, res, next) =>
  addBranch(req, res, next, db)
);
router.post("/deleteBranch", signupValidation, (req, res, next) =>
  deleteBranch(req, res, next, db)
);
router.get("/getAllBranchs", (req, res) => getAllBranchs(req, res, db));
router.post("/updateBranch", signupValidation, (req, res, next) =>
  updateBranch(req, res, next, db)
);
router.get("/getSpecificBranch", (req, res) => getSpecificBranch(req, res, db));

//coursel
router.post("/courselAdd", upload, (req, res, next) =>
  courselAdd(req, res, next, db)
);
router.post("/deleteCoursel", signupValidation, (req, res, next) =>
  courselDelete(req, res, next, db)
);
router.post("/courselImgUpdate", upload, (req, res, next) =>
  courselImgUpdate(req, res, next, db)
);
router.post("/courselUpdate", signupValidation, (req, res, next) =>
  courselUpdate(req, res, next, db)
);

router.get("/courselGetAll", (req, res) => getAllCoursel(req, res, db));
//getCurrencyInfo

router.post("/createCurrencyInformation", upload, (req, res, next) =>
  createCurrencyInformation(req, res, next, db)
);

router.post("/updateCurrecnyInformation", signupValidation, (req, res, next) =>
  updateCurrecnyInformation(req, res, next, db)
);
router.post("/updateCurrencyIcon", upload, (req, res, next) =>
updateCurrencyIcon(req, res, next, db)
);
router.post("/deleteCurrencyInformation", signupValidation, (req, res, next) =>
  deleteCurrencyInformation(req, res, next, db)
);

router.get("/getCurrencyInfo", (req, res) => getCurrencyInfo(req, res, db));

router.post("/register", signupValidation, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "This user is already in use!",
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (name, email, password) VALUES ('${
                req.body.name
              }', ${db.escape(req.body.email)}, ${db.escape(hash)})`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "The user has been registerd with us!",
                });
              }
            );
          }
        });
      }
    }
  );
});
router.post("/login", loginValidation, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Email or password is incorrect!",
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Email or password is incorrect!",
            });
          }
          if (bResult) {
            const token = jwt.sign(
              { id: result[0].id },
              "the-super-strong-secrect",
              { expiresIn: "1h" }
            );
            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});
router.post("/get-user", signupValidation, (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.headers.authorization.split(" ")[1]
  ) {
    return res.status(422).json({
      message: "Please provide the token",
    });
  }
  const theToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(theToken, "the-super-strong-secrect");
  db.query(
    "SELECT * FROM users where id=?",
    decoded.id,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results[0],
        message: "Fetch Successfully.",
      });
    }
  );
});

module.exports = router;
