const express = require("express");
const authentication = require("../middlewares/authentication.middleware");
const ExpenseModel = require("../models/expense.model");
const UserModel = require("../models/user.mode");
const expenseRouter = express.Router();

expenseRouter.post("/add", authentication, async (req, res) => {
  const input = req.body;
  const userId = req.userId;
  try {
    const newBid = await ExpenseModel.create({ ...input, createdBy: userId });

    res.send({ message: "new Expense added", data: newBid });
  } catch (error) {
    console.log(error);
    res.send({ message: "internal error" });
  }
});

expenseRouter.get("/all", async (req, res) => {
  const { id } = req.params;

  try {
    const allExpenses = await ExpenseModel.find({});
    const totalAmount = allExpenses.reduce((sum, doc) => sum + doc.amount, 0);
    res.send({ allExpenses, totalAmount });
  } catch (error) {
    console.log(error);
    res.send({ message: "internal error" });
  }
});
expenseRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const allExpenses = await ExpenseModel.deleteOne({ _id: id });

    res.send({ message: "Deleted" });
  } catch (error) {
    console.log(error);
    res.send({ message: "internal error" });
  }
});
expenseRouter.patch("/budget", authentication, async (req, res) => {
  const  {limit}  = req.body;
  const userId = req.userId;

  console.log(limit);
  try {
    const allExpenses = await UserModel.updateOne(
      { _id: userId },
      { $set: { limit: limit } }
    );
    res.send({ message: "Deleted" });
  } catch (error) {
    console.log(error);
    res.send({ message: "internal error" });
  }
});

module.exports = expenseRouter;
