const addBranch=(req,res,next,db)=>{

    db.query(
        `INSERT INTO branch (phone_line1,phone_line2,manager_name,manager_phone_no,address,city,state,coordinate,insertionDate) VALUES ( "${req.body.phone_line1}","${req.body.phone_line2}","${req.body.manager_name}","${req.body.manager_phone_no}","${req.body.address}","${req.body.city}","${req.body.state}","${req.body.coordinate}",now())`,
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
}
const deleteBranch=(req,res,next,db)=>{
  db.query(
    `DELETE FROM branch WHERE id=  ${req.body.id}`,    (err, result) => {
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
const updateBranch=(req,res,next,db)=>{
  if(req.body.id && req.body.phone_line1 && req.body.phone_line2 && req.body.manager_name && req.body.manager_phone_no && req.body.address && req.body.city&&req.body.state &&req.body.coordinate)
  db.query(
    `UPDATE branch 
    SET phone_line1=${req.body.phone_line1},phone_line2=${req.body.phone_line2},manager_name="${req.body.manager_name}",manager_phone_no="${req.body.manager_phone_no}",address="${req.body.address}",city="${req.body.city}",state="${req.body.state}",coordinate="${req.body.coordinate}",insertionDate=now() where id=${req.body.id}`,
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
    else res.status(400).send({msg:"id must be set"});


}
const getAllBranchs=(req,res,db)=>{
  db.query(
    "SELECT * FROM branch",
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
const getSpecificBranch=(req,res,db)=>{
if (req.body.id)
  db.query(
    `SELECT * FROM branch where id=${req.body.id}`,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Fetch Successfully.",
      });
    }
  );
  else res.status(404).send({
    error: true,
    msg:"id must be provided"
  });
}
module.exports={addBranch,deleteBranch,updateBranch,getAllBranchs,getSpecificBranch}