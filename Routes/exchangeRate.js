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

}
const updateExRate=(req,res,next,db)=>{

}
const deleteExRate=(req,res,next,db)=>{

}
const getExRate=(req,res)=>{

}
module.exports={updateCurrencyIcon,createCurrencyInformation,deleteCurrencyInformation,updateCurrecnyInformation,getCurrencyInfo,insertExRate,updateExRate,deleteExRate,getExRate}