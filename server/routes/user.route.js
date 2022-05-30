const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
var multer = require("multer");
var upload = multer()
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.post("/api/post", [authJwt.verifyToken], controller.addNote);
  app.get("/api/retrive",[authJwt.verifyToken], controller.retriveInterns);
  app.get("/api/user/:id",[authJwt.verifyToken], controller.retriveUser);
  app.get("/api/intern/:id",[authJwt.verifyToken], controller.retriveIntern);
  app.delete("/api/intern/:id",[authJwt.verifyToken], controller.deleteIntern);
  app.post("/api/post", [authJwt.verifyToken,upload.single("cv")],controller.addIntern);
  app.patch("/api/intern/:id",[authJwt.verifyToken,upload.single("cv")],controller.updateIntern);
  app.put("/api/user/:id",[authJwt.verifyToken],controller.updateUser);
};