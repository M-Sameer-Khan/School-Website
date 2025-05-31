const db = require("../models");
const FeeStructure = db.feeStructures;
const Op = db.Sequelize.Op;

// Create and Save a new Fee Structure
exports.create = (req, res) => {
  // Validate request
  if (!req.body.class_name) {
    res.status(400).send({
      message: "Class name cannot be empty!"
    });
    return;
  }

  // Create a Fee Structure
  const feeStructure = {
    class_name: req.body.class_name,
    admission_fee: req.body.admission_fee || 0,
    monthly_fee: req.body.monthly_fee || 0,
    annual_fee: req.body.annual_fee || 0,
    exam_fee: req.body.exam_fee || 0,
    lab_fee: req.body.lab_fee || 0,
    transport_fee: req.body.transport_fee || 0,
    academic_year: req.body.academic_year || "2025-2026",
    notes: req.body.notes
  };

  // Save Fee Structure in the database
  FeeStructure.create(feeStructure)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Fee Structure."
      });
    });
};

// Retrieve all Fee Structures from the database.
exports.findAll = (req, res) => {
  const { class_name, academic_year } = req.query;
  let condition = {};

  if (class_name) {
    condition.class_name = { [Op.iLike]: `%${class_name}%` };
  }

  if (academic_year) {
    condition.academic_year = academic_year;
  }

  FeeStructure.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fee structures."
      });
    });
};

// Find a single Fee Structure with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  FeeStructure.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Fee Structure with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Fee Structure with id=" + id
      });
    });
};

// Update a Fee Structure by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  FeeStructure.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Fee Structure was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Fee Structure with id=${id}. Maybe Fee Structure was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Fee Structure with id=" + id
      });
    });
};

// Delete a Fee Structure with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  FeeStructure.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Fee Structure was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Fee Structure with id=${id}. Maybe Fee Structure was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Fee Structure with id=" + id
      });
    });
};

// Delete all Fee Structures from the database.
exports.deleteAll = (req, res) => {
  FeeStructure.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Fee Structures were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all fee structures."
      });
    });
};

// Find all Fee Structures for a specific academic year
exports.findByAcademicYear = (req, res) => {
  const academicYear = req.params.academicYear;

  FeeStructure.findAll({
    where: { academic_year: academicYear }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Error retrieving Fee Structures for academic year ${academicYear}`
      });
    });
};
