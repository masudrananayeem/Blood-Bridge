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

// @route  GET /api/users/search-donors
// @desc   Search for available donors by blood group / location
export const searchDonors = async (req, res, next) => {
  try {
    const { bloodGroup, district, upazila, verifiedOnly } = req.query;

    const filter = { role: { $ne: "admin" } };
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (district) filter.district = district;
    if (upazila) filter.upazila = new RegExp(upazila, "i");
    if (verifiedOnly === "true") filter.isVerified = true;
    filter.isAvailable = true;

    const donors = await User.find(filter)
      .select("fullName bloodGroup district upazila photoURL isVerified isAvailable lastDonationDate")
      .limit(50);

    res.json({ success: true, donors });
  } catch (err) {
    next(err);
  }
};

// @route  PATCH /api/users/saved-donors/:donorId
// @desc   Add/remove a donor from the logged-in seeker's saved list
export const toggleSavedDonor = async (req, res, next) => {
  try {
    const { donorId } = req.params;
    const already = req.user.savedDonors.some((id) => id.toString() === donorId);

    if (already) {
      req.user.savedDonors = req.user.savedDonors.filter((id) => id.toString() !== donorId);
    } else {
      req.user.savedDonors.push(donorId);
    }

    await req.user.save();
    res.json({ success: true, savedDonors: req.user.savedDonors, saved: !already });
  } catch (err) {
    next(err);
  }
};

// @route  GET /api/users/saved-donors
export const getSavedDonors = async (req, res, next) => {
  try {
    const populated = await req.user.populate({
      path: "savedDonors",
      select: "fullName bloodGroup district upazila photoURL isVerified isAvailable",
    });
    res.json({ success: true, donors: populated.savedDonors });
  } catch (err) {
    next(err);
  }
};
