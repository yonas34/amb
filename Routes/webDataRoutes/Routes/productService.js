const fs = require('fs')

const productAdd=async(req, res,next,db)=>{

 console.log(req.file.path)

 db.query(
   `INSERT INTO product (productName,productDescription,productDescriptionMore,imgPath,insertionDate) VALUES ( "${req.body.productName}", "${req.body.productDescription}","${req.body.productDescriptionMore}","/${req.file.path}",now())`,
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
const productDelete=(req, res,next,db)=>{
   fs.unlink(req.body.imgPath.slice(1), (err => {
      if (err) console.log(err);
      else {
         db.query(
            `DELETE FROM product WHERE id=  ${req.body.id}`,    (err, result) => {
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
const productImgUpdate=(req,res,next,db)=>{

   //arguments oldImgPath and record id
   fs.unlink(req.body.oldImgPath.slice(1), (err => {
      if (err) console.log(err);
      else {
    
         db.query(
            `UPDATE product 
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
const productUpdate=(req,res,next,db)=>
{

  if(!("/"+req.file.path===req.body.oldImgPath))  {
    

    fs.unlink(req.body.oldImgPath.slice(1), (err) => {
      if (err) return res.status(404).send( err);
   db.query(
      `UPDATE product 
      SET productDescription="${req.body.productDescription}",imgPath="/${req.file.path}", productDescriptionMore="${req.body.productDescriptionMore}",productName="${req.body.productName}",insertionDate=now() where id=${req.body.id}`,
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err,
          });}
          return res.status(201).send({
              msg: "updated",
            });
      
      })
    })

}

else{

  db.query(
    `UPDATE product 
    SET productDescription="${req.body.productDescription}", productDescriptionMore="${req.body.productDescriptionMore}",productName="${req.body.productName}",insertionDate=now() where id=${req.body.id}`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });}
        return res.status(201).send({
            msg: "Inforation updated!",
          });
    
    })

}



}
const getAllProduct=(req,res,db)=>{
   db.query(
      "SELECT * FROM  product",
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
module.exports={productAdd,productDelete,productImgUpdate,productUpdate,getAllProduct}