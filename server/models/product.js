const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [{ type: ObjectId, ref: "Sub" }],
    quantity: Number,
    sold: { type: Number, default: 0 },
    images: { type: Array },
    shipping: { type: String, enum: ["Yes", "No"] },
    color: {
      type: String,
      enum: [
        "Black",
        "Brown",
        "White",
        "Blue",
        "Red",
        "Pink",
        "Green",
        "Orange",
        "Cyan",
        "Peach",
        "Violet",
        "Nude",
      ],
    },
    brand: {
      type: String,
      enum: [
        "Roche Bobois",
        "Edra",
        "FENDI CASA",
        "Joybird",
        "IKEA",
        "Daiso",
        "La-Z-Boy",
      ],
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Product", productSchema);
