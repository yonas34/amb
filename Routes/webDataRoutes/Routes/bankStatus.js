//SELECT * FROM   Student_Registration ORDER  BY sample_ts DESC LIMIT  1;

const getBankStatus = (req, res, db) => {
  db.query(
    "SELECT * FROM bankStatus  order by insertionDate desc limit 1",
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results[0],
        message: "Fetch Successfully.",
      });
    }
  );
};
const postBankStatus = (req, res, next, db) => {
    //inserting Bank status into database
  db.query(
    `INSERT INTO bankStatus (paid_capital,branch,partners,customers,transaction_count,atm,pos,age,insertionDate) VALUES ( ${req.body.paid_capital}, ${req.body.branch},${req.body.partners},${req.body.customers},${req.body.transaction_count},${req.body.atm},${req.body.pos},${req.body.age},now())`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      return res.status(201).send({
        msg: "Data inserted",
      });
    }
  );
};

const updateBankStatus = (req, res, next, db) => {

    db.query(
        `UPDATE bankStatus 
        SET paid_capital=${req.body.paid_capital},branch=${req.body.branch},partners=${req.body.partners},customers=${req.body.customers},transaction_count=${req.body.transaction_count},atm=${req.body.atm},pos=${req.body.pos},age=${req.body.age},insertionDate=now()
        ORDER BY id DESC
        LIMIT 1
         `,
        (err, result) => {
          if (err) {
            throw err;
            return res.status(400).send({
              msg: err,
            });}
            return res.status(201).send({
                msg: "Data updated",
              });
        
        })
     
};

module.exports = { postBankStatus, updateBankStatus, getBankStatus };
