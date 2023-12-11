const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: String, required: [true, "Category is required"] },
    expense: { type: Number, required: [true, "expense is required"] },
    name: { type: String, required: [true, "name is required"] },
    expensedate: { type: String, required: [true, "date is required"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("expense", expenseSchema);
