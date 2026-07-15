import User from "../models/User.js";
import DonationHistory from "../models/DonationHistory.js";

// @route  PUT /api/users/profile
// @desc   Update editable profile fields
export const updateProfile = async (req, res, next) => {
  try {
    const editable = [
      "fullName",
      "phone",
      "bloodGroup",
      "district",
      "upazila",
      "address",
      "photoURL",
    ];
    editable.forEach((field) => {
      if (req.body[field] !== undefined) {
        req.user[field] = req.body[field];
      }
    });

    await req.user.save();
    res.json({ success: true, user: req.user });
  } catch (err) {
    next(err);
  }
};

// @route  PATCH /api/users/availability
// @desc   Toggle the donor's Available / Unavailable status
export const toggleAvailability = async (req, res, next) => {
  try {
    const { isAvailable } = req.body;
    req.user.isAvailable = !!isAvailable;
    await req.user.save();
    res.json({ success: true, isAvailable: req.user.isAvailable });
  } catch (err) {
    next(err);
  }
};

// @route  PATCH /api/users/mode
// @desc   Switch the single account between Donor and Seeker mode
export const switchMode = async (req, res, next) => {
  try {
    const { mode } = req.body;
    if (!["donor", "seeker"].includes(mode)) {
      res.status(400);
      throw new Error("mode must be 'donor' or 'seeker'");
    }
    req.user.activeMode = mode;
    await req.user.save();
    res.json({ success: true, activeMode: req.user.activeMode });
  } catch (err) {
    next(err);
  }
};

// @route  GET /api/users/donation-history
export const getDonationHistory = async (req, res, next) => {
  try {
    const history = await DonationHistory.find({ donor: req.user._id }).sort({ donationDate: -1 });
    res.json({ success: true, history });
  } catch (err) {
    next(err);
  }
};
