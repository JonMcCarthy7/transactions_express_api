const users = require("../controllers/users_controller");
const transactions = require("../controllers/transactions_controller");

module.exports = function(app) {
  app.get("/transactions", transactions.index);
  app.get("/transactions/:id", transactions.show);
  app.post("/transactions", transactions.create);
  app.put("/transactions/:id", transactions.update);
  app.delete("/transactions/:id", transactions.delete);
};
