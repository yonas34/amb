const routes=(db,router,signupValidation,loginValidation,validationResult,bcrypt,jwt)=>
{
router.get("/", (req, res) => {
  res.send("working!");
});

return router;
}
module.exports = routes;
