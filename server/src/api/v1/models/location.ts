import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  administrativeUnit: {
    provinceId: { type: String, required: true },
    provinceName: { type: String, required: true },
    districtId: { type: String, required: true },
    districtName: { type: String, required: true },
    wardId: { type: String },
    wardName: { type: String },
  },
  coordinates: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] },
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  /*   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }, */
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

locationSchema.index({ "administrativeUnit.provinceId": 1, "administrativeUnit.districtId": 1 });
locationSchema.index({ coordinates: "2dsphere" });

const Location = mongoose.model("Location", locationSchema, "locations");

export default Location;