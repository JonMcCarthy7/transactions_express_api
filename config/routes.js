const users = require("../controllers/users_controller");
const transactions = require("../controllers/transactions_controller");
const userTransactions = require("../controllers/user_transactions_controller");

module.exports = function(app) {
  //Transactions
  app.get("/transactions", transactions.index);
  app.get("/transactions/:id", transactions.show);
  app.post("/transactions", transactions.create);
  app.put("/transactions/:id", transactions.update);
  app.delete("/transactions/:id", transactions.delete);

  //Users
  app.get("/users", users.index);
  app.get("/users/:id", users.show);
  app.post("/users", users.create);
  app.put("/users/:id", users.update);
  app.delete("/users/:id", users.delete);

  //User Transactions
  app.get("/users/:users_id/transactions", userTransactions.index);
  app.get(
    "/users/:users_id/transactions/:transactions_id",
    userTransactions.show
  );
};
