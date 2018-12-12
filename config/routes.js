const users = require("../controllers/users_controller");
const transactions = require("../controllers/transactions_controller");
const userTransactions = require("../controllers/user_transactions_controller");

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";

module.exports = function(app) {
  app.get("/user", users.verify);
  app.post("/users", users.create);
  app.post("/sessions", users.login);

  app.use(verifyToken);

  //Transactions
  app.get("/transactions", transactions.index);
  app.get("/transactions/:id", transactions.show);
  app.post("/transactions", transactions.create);
  app.put("/transactions/:id", transactions.update);
  app.delete("/transactions/:id", transactions.delete);

  //Users

  app.get("/users", users.index);
  app.get("/users/:id", users.show);
  app.put("/users/:id", users.update);
  app.delete("/users/:id", users.delete);

  //User Transactions
  app.get("/users/:users_id/transactions", userTransactions.index);
  app.get(
    "/users/:users_id/transactions/:transactions_id",
    userTransactions.show
  );
};

function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers["token"];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.status(401).send({
          message:
            "You are not authorized to view that resource, Please log in to continue."
        });
      } else {
        // if everything is good, save to request for use in other routes
        delete decoded.password;
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(401).send({
      message:
        "You are not authorized to view that resource, Please log in to continue."
    });
  }
}
