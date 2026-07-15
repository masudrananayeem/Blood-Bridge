import mongoose from "mongoose";

const donationHistorySchema = new mongoose.Schema(
  {
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    bloodGroup: { type: String, required: true },
    units: { type: Number, default: 1 },
    hospital: { type: String, required: true },
    district: { type: String, required: true },
    donationDate: { type: Date, required: true },
    // Links back to the BloodRequest this donation fulfilled, if any
    // (BloodRequest model is added in Step 10 — kept as a plain ObjectId
    // ref now so this schema doesn't need to change later).
    request: { type: mongoose.Schema.Types.ObjectId, ref: "BloodRequest", default: null },
  },
  { timestamps: true }
);

const DonationHistory = mongoose.model("DonationHistory", donationHistorySchema);
export default DonationHistory;
