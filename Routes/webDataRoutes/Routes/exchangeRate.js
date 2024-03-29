//create currency information
//update currency information
//delete currency information
//getCurrency

//insert currency
//update currency
//delete currency
const fs = require('fs')
const createCurrencyInformation=(req,res,next,db)=>{

if(req.body.name && req.body.abbr)
{
    db.query(
        `INSERT INTO currencyInformation (abbr,name,iconUrl,insertionDate) VALUES ( "${req.body.abbr}", "${req.body.name}","/${req.file.path}",now())`,
        (err, result) => {
          if (err) {
            throw err;
            return res.status(400).send({
              msg: err,
            });
          }
          return res.status(201).send({
            msg: "Currency information inserted!",
          });
        }
      );
     


}



}

const updateCurrecnyInformation=(req,res,next,db)=>{
    db.query(
        `UPDATE currencyInformation
        SET name="${req.body.name}",abbr="${req.body.abbr}",insertionDate=now() where id=${req.body.id}`,
        (err, result) => {
          if (err) {
            throw err;
            return res.status(400).send({
              msg: err,
            });}
            return res.status(201).send({
                msg: "Currency information updated",
              });
        
        })
  
  

}
const updateCurrencyIcon=(req,res,next,db)=>{
   //arguments oldImgPath and record id
   fs.unlink(req.body.oldImgPath.slice(1), (err => {
    if (err) console.log(err);
    else {
  
       db.query(
          `UPDATE currencyInformation
          SET iconUrl="/${req.file.path}",insertionDate=now() where id=${req.body.id}`,
          (err, result) => {
            if (err) {
              throw err;
              return res.status(400).send({
                msg: err,
              });}
              return res.status(201).send({
                  msg: "icon updated",
                });
          
          })



    }
  }));


}
const deleteCurrencyInformation=(req,res,next,db)=>{
    fs.unlink(req.body.imgPath.slice(1), (err => {
        if (err) console.log(err);
        else {
           db.query(
              `DELETE FROM currencyInformation WHERE id=  ${req.body.id}`,    (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "Currency information  Deleted!",
                });
              }
            );
           
        }
      }));
}

const getCurrencyInfo=(req,res,db)=>{
    db.query(
        "SELECT * FROM  currencyInformation",
        function (error, results, fields) {
          if (error) throw error;
          return res.send({
            error: false,
            data: results,
            message: "Fetch Successfully.",
          });
        }
      );
}





const insertExRate=(req,res,next,db)=>{


 
    if(req.body.currencyId && req.body.cashBuying && req.body.cashSelling)
      db.query(
          `INSERT INTO exRate (currencyId,cashBuying,cashSelling,insertionDate) VALUES ( "${req.body.currencyId}", "${req.body.cashBuying}","${req.body.cashSelling}",now())`,
          (err, result) => {
            if (err) {
              throw err;
              return res.status(400).send({
                msg: err,
              });
            }
            return res.status(201).send({
              msg: "exchhange rate inserted!",
            });
          }
        );
        else{

          return res.status(404).send({
            msg:"you need to insert full information of exchange rate"
          })
        
       
  
  
  }
  



}
const updateExRate=(req,res,next,db)=>{

  db.query(
    `UPDATE exRate 
    SET currencyId=${req.body.currencyId},cashBuying=${req.body.cashBuying},cashSelling=${req.body.cashSelling},insertionDate=now() where id=${req.body.id}`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });}
        return res.status(201).send({
            msg: "exchange rate updated",
          });
    
    })
}
const deleteExRate=(req,res,next,db)=>{

  if(req.body.id)
  db.query(
    `DELETE FROM exRate WHERE id=  ${req.body.id}`,    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      return res.status(201).send({
        msg: "exchange Rate Deleted!",
      });
    }
  );
  else{

    return res.status(404).send({msg:"record id must be provided!"});
  }
}
const getExRate=(req,res,db)=>{
  db.query(
    "SELECT * FROM  exRate",
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Fetch Successfully.",
      });
    }
  );
}
module.exports={updateCurrencyIcon,createCurrencyInformation,deleteCurrencyInformation,updateCurrecnyInformation,getCurrencyInfo,insertExRate,updateExRate,deleteExRate,getExRate}