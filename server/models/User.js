import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },

    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },

    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    dob: { type: Date, required: true },

    district: { type: String, required: true },
    upazila: { type: String, required: true },
    address: { type: String, required: true },

    photoURL: { type: String, default: "" },

    // A single account can act as either — this is the "Current Mode" toggle
    // on the dashboard, not a fixed role. `admin` is set manually / via a
    // trusted script, never through public registration.
    role: { type: String, enum: ["donor", "seeker", "admin"], default: "donor" },
    activeMode: { type: String, enum: ["donor", "seeker"], default: "donor" },

    isAvailable: { type: Boolean, default: true }, // donor availability toggle
    isVerified: { type: Boolean, default: false }, // admin-verified donor badge
    lastDonationDate: { type: Date, default: null },
  },
  { timestamps: true } // adds createdAt / updatedAt
);

userSchema.index({ bloodGroup: 1, district: 1, upazila: 1, isAvailable: 1 });

const User = mongoose.model("User", userSchema);
export default User;
