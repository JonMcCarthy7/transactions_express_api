const knex = require("../db/knex.js");
const hasher = require("../config/hasher");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";

module.exports = {
  create: (req, res) => {
    hasher.hash(req.body).then(user => {
      knex("users")
        .insert(
          {
            email: user.email,
            password: user.password
          },
          "id"
        )
        .then(results => {
          res.json({
            message: "Successfully Registered, Please Log In",
            resulets: results[0]
          });
        })
        .catch(err => {
          res.status(400).send({ message: err });
        });
    });
  },
  login: (req, res) => {
    knex("users")
      .where("email", req.body.email)
      .first()
      .then(user => {
        if (user) {
          hasher.check(user, req.body).then(isMatch => {
            if (isMatch) {
              const token = jwt.sign(user, secret);
              delete user.password;
              res.json({ message: "Successfully Signed In" }, token, user);
            } else {
              res.status(400).send({ message: "Invalid Email / Password" });
            }
          });
        } else {
          res.status(400).send({ message: "Invalid Email / Password" });
        }
      })
      .catch(err => {
        res.status(400).send({ message: "Invalid Email / Password" });
      });
  },
  verify: (req, res) => {
    res.json(req.decoded);
  },
  index: (req, res) => {
    knex("users").then(users => {
      res.json(users);
    });
  },
  show: (req, res) => {
    knex("users")
      .where("users.id", req.params.id)
      .then(user => {
        res.json(user);
      });
  },
  update: (req, res) => {
    knex("users")
      .where("users.id", req.params.id)
      .update({
        email: req.body.email,
        password: req.body.password
      })
      .returning("*")
      .then(result => {
        res.status(200).send(result);
      });
  },
  delete: (req, res) => {
    knex("users")
      .where("users.id", req.params.id)
      .del()
      .then(result => {
        res.status(200).send("User Successfully Deleted");
      });
  }
};
