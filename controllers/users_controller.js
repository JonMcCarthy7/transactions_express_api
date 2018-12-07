const knex = require("../db/knex.js");

module.exports = {
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
  create: (req, res) => {
    knex("users")
      .insert(
        {
          email: req.body.email,
          password: req.body.password
        },
        "*"
      )
      .then(result => {
        res.status(201).send(result);
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
