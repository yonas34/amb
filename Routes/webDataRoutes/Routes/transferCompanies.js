const fs = require('fs')

const courselAdd=async(req, res,next,db)=>{

 console.log(req.file.path)

 db.query(
   `INSERT INTO coursel (title,description,imgPath,insertionDate) VALUES ( "${req.body.title}", "${req.body.description}","/${req.file.path}",now())`,
   (err, result) => {
     if (err) {
       throw err;
       return res.status(400).send({
         msg: err,
       });
     }
     return res.status(201).send({
       msg: "coursel inserted!",
     });
   }
 );


}
const courselDelete=(req, res,next,db)=>{
   fs.unlink(req.body.imgPath.slice(1), (err => {
      if (err) console.log(err);
      else {
         db.query(
            `DELETE FROM coursel WHERE id=  ${req.body.id}`,    (err, result) => {
              if (err) {
                throw err;
                return res.status(400).send({
                  msg: err,
                });
              }
              return res.status(201).send({
                msg: "Data Deleted",
              });
            }
          );
         
      }
    }));

}
const courselImgUpdate=(req,res,next,db)=>{

   //arguments oldImgPath and record id
   fs.unlink(req.body.oldImgPath.slice(1), (err => {
      if (err) console.log(err);
      else {
    
         db.query(
            `UPDATE coursel 
            SET imgPath="/${req.file.path}",insertionDate=now() where id=${req.body.id}`,
            (err, result) => {
              if (err) {
                throw err;
                return res.status(400).send({
                  msg: err,
                });}
                return res.status(201).send({
                    msg: "Image updated",
                  });
            
            })



      }
    }));




}
const courselUpdate=(req,res,next,db)=>
{
   db.query(
      `UPDATE coursel 
      SET description="${req.body.description}",title="${req.body.title}",insertionDate=now() where id=${req.body.id}`,
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err,
          });}
          return res.status(201).send({
              msg: "Image updated",
            });
      
      })

}
const getAllCoursel=(req,res,db)=>{
   db.query(
      "SELECT * FROM  coursel",
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
module.exports={courselAdd,courselDelete,courselImgUpdate,courselUpdate,getAllCoursel}