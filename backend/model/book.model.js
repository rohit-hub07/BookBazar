import mongoose from "mongoose";
import User from "./user.model.js";

const bookSchema = new mongoose.Schema(
  {
    bookImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    purchasedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timeStamps: true }
);

const Books = new mongoose.model("Books", bookSchema);

export default Books;
