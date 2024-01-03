const { default: mongoose } = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    title: String,
    category: String,
    amount: Number,
    createdBy: String,
  },
  {
    timestamps: true,
  }
);

const ExpenseModel = mongoose.model("bid", expenseSchema);
module.exports = ExpenseModel;
