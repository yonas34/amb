//insert news
//title
//description

//image
const fs = require("fs");

const postNews = (req, res, next, db) => {
  if ((req.body.title, req.body.description)) {
    db.query(
      `INSERT INTO news (title,description,image_url,insertionDate) VALUES ( "${req.body.title}", "${req.body.description}","/${req.file.path}",now())`,
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err,
          });
        }
        return res.status(201).send({
          msg: "news successfully inserted!",
        });
      }
    );
  } else {
    return res.status(404).send({ msg: req.body });
  }
};

const getNews = (req, res, db) => {
  db.query(`SELECT * from news`, function (error, results, fields) {
    if (error) throw error;
    return res.status(200).send({
      error: false,
      data: results,
      message: "Fetch Successfully.",
    });
  });
};

const updateNews = (req, res, next, db) => {
  //arguments oldImgPath and record id
  
  if(!("/"+req.file.path===req.body.oldImgPath))  { fs.unlink(req.body.oldImgPath.slice(1), (err) => {
    if (err) return res.status(404).send( err);
    else {
      db.query(
        `UPDATE news
               SET image_url="/${req.file.path}",insertionDate=now(),title="${req.body.title}",description="${req.body.description}" where id=${req.body.id}`,
        (err, result) => {
          if (err) {
            throw err;
            return res.status(400).send({
              msg: err,
            });
          }
          return res.status(201).send({
            msg: "icon updated",
          });
        }
      );
    }
  });
}
else{
  db.query(
    `UPDATE news
           SET insertionDate=now(),title="${req.body.title}",description="${req.body.description}" where id=${req.body.id}`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      return res.status(201).send({
        msg: "icon updated",
      });
    }
  );
}

};

const deleteNews = (req, res, next, db) => {
    fs.unlink(req.body.imgPath.slice(1), (err => {
        if (err) console.log(err);
        else {
           db.query(
              `DELETE FROM news WHERE id=  ${req.body.id}`,    (err, result) => {
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
  

};

module.exports = { postNews, getNews, updateNews,deleteNews };
