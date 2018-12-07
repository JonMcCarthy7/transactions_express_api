const knex = require("../db/knex.js");

module.exports = {
  index: (req, res) => {
    knex("users")
      .join("transactions", "users.id", "transactions.users_id")
      .where("users.id", req.params.users_id)
      .then(data => {
        res.json(data);
      });
  },
  show: (req, res) => {
    knex("users")
      .join("transactions", "users.id", "transactions.users_id")
      .where("users.id", req.params.users_id)
      .andWhere("transactions.id", req.params.transactions_id)
      .then(data => {
        res.json(data);
      });
  }
};
