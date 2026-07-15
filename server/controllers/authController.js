import admin from "../config/firebaseAdmin.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @route  POST /api/auth/register
// @desc   Verify the Firebase ID token, then create the matching MongoDB
//         profile with the extra fields collected on the registration form.
export const register = async (req, res, next) => {
  try {
    const {
      idToken,
      fullName,
      email,
      phone,
      bloodGroup,
      gender,
      dob,
      district,
      upazila,
      address,
      photoURL,
    } = req.body;

    if (!idToken) {
      res.status(400);
      throw new Error("Missing Firebase ID token");
    }

    const decoded = await admin.auth().verifyIdToken(idToken);

    const existing = await User.findOne({ firebaseUid: decoded.uid });
    if (existing) {
      res.status(409);
      throw new Error("This account is already registered");
    }

    const user = await User.create({
      firebaseUid: decoded.uid,
      fullName,
      email: email || decoded.email,
      phone,
      bloodGroup,
      gender,
      dob,
      district,
      upazila,
      address,
      photoURL,
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({ success: true, token, user });
  } catch (err) {
    next(err);
  }
};

// @route  POST /api/auth/login
// @desc   Verify the Firebase ID token (from email/password or Google
//         sign-in) and exchange it for our own backend JWT + Mongo profile.
export const login = async (req, res, next) => {
  try {
    const { firebaseIdToken } = req.body;
    if (!firebaseIdToken) {
      res.status(400);
      throw new Error("Missing Firebase ID token");
    }

    const decoded = await admin.auth().verifyIdToken(firebaseIdToken);

    const user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) {
      res.status(404);
      throw new Error("No profile found for this account — please register first");
    }

    const token = generateToken(user._id, user.role);

    res.json({ success: true, token, user });
  } catch (err) {
    next(err);
  }
};

// @route  GET /api/auth/me
// @desc   Return the logged-in user's profile (req.user set by `protect`)
export const getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};
