import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    author: { type: String },
    productImages: [{ type: String }],
    productType: {
      type: String,
      enum: [
        "Electronics",
        "Vehicles",
        "Property Rentals",
        "Toys & Games",
        "Furniture",
        "Accessories",
        "Other",
      ],
    },
    description: { type: String, required: true },
    price: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
