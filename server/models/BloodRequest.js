import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema(
  {
    seeker: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },

    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    units: { type: Number, required: true, min: 1 },
    hospital: { type: String, required: true, trim: true },
    district: { type: String, required: true },
    upazila: { type: String, required: true },
    urgency: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    reason: { type: String, trim: true },
    neededByDate: { type: Date, required: true },

    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "cancelled"],
      default: "pending",
      index: true,
    },
    acceptedDonor: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

bloodRequestSchema.index({ bloodGroup: 1, district: 1, status: 1 });

const BloodRequest = mongoose.model("BloodRequest", bloodRequestSchema);
export default BloodRequest;
