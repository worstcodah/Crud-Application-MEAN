var userDB = require("../model/model");

//Create and save new user
exports.create = (req, res) => {
  //Validations
  if (!req.body) {
    res.status(400).send({ message: "Empty content" });
    return;
  }

  //Create
  const user = new userDB({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  user
    .save(user)
    .then((data) => {
      res.redirect("/add-user");
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Couldn't create a new user!" });
    });
};

//Return an / multiple user/users
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    userDB
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `User with id ${id} not found` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    userDB
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "Error in finding specified user" });
      });
  }
};

//Update user given the id

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can't be empty!" });
  }

  const id = req.params.id;
  userDB
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot update user with id ${id}` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error in updating user information" });
    });
};

//Delete user given the id
exports.delete = (req, res) => {
  const id = req.params.id;
  userDB
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot delete user with id ${id}` });
      } else {
        res.send({ message: "User deletion complete!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error occured while deleting user" });
    });
};
