module.exports = app => {
  const fees = require("../controllers/fee.controller.js");
  const { authJwt } = require("../middleware");

  var router = require("express").Router();

  // Create a new Fee Structure
  router.post("/", [authJwt.verifyToken, authJwt.isAdmin], fees.create);

  // Retrieve all Fee Structures
  router.get("/", fees.findAll);

  // Retrieve a single Fee Structure with id
  router.get("/:id", fees.findOne);

  // Update a Fee Structure with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], fees.update);

  // Delete a Fee Structure with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], fees.delete);

  // Delete all Fee Structures
  router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], fees.deleteAll);

  // Retrieve all Fee Structures for a specific academic year
  router.get("/academic-year/:academicYear", fees.findByAcademicYear);

  app.use('/api/fees', router);
};
