const knex = require("../db/knex.js");

module.exports = {
  index: (req, res) => {
    knex("transactions").then(trans => {
      res.json(trans);
    });
  },
  show: (req, res) => {
    knex("transactions")
      .where("transactions.id", req.params.id)
      .then(trans => {
        res.json(trans);
      });
  },
  create: (req, res) => {
    knex("transactions")
      .insert(
        {
          users_id: req.body.users_id,
          amount: req.body.amount,
          transaction_type: req.body.transaction_type,
          business_name: req.body.business_name
        },
        "*"
      )
      .then(result => {
        res.status(201).send(result);
      });
  },
  update: (req, res) => {
    knex("transactions")
      .where("transactions.id", req.params.id)
      .update({
        users_id: req.body.users_id,
        amount: req.body.amount,
        transaction_type: req.body.transaction_type,
        business_name: req.body.business_name
      })
      .returning("*")
      .then(result => {
        res.status(200).send(result);
      });
  },
  delete: (req, res) => {
    knex("transactions")
      .where("transactions.id", req.params.id)
      .del()
      .then(result => {
        res.status(200).send("Transaction Successfully Deleted");
      });
  }
};
