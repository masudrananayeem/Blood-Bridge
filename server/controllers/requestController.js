import BloodRequest from "../models/BloodRequest.js";

// @route  POST /api/requests
// @desc   Create a new (emergency) blood request
export const createRequest = async (req, res, next) => {
  try {
    const { bloodGroup, units, hospital, district, upazila, urgency, reason, neededByDate } = req.body;

    const request = await BloodRequest.create({
      seeker: req.user._id,
      bloodGroup,
      units,
      hospital,
      district,
      upazila,
      urgency,
      reason,
      neededByDate,
    });

    res.status(201).json({ success: true, request });
  } catch (err) {
    next(err);
  }
};

// @route  GET /api/requests/my-requests?status=pending
// @desc   List the logged-in seeker's own requests, optionally filtered by status
export const getMyRequests = async (req, res, next) => {
  try {
    const filter = { seeker: req.user._id };
    if (req.query.status) filter.status = req.query.status;

    const requests = await BloodRequest.find(filter)
      .populate("acceptedDonor", "fullName phone bloodGroup")
      .sort({ createdAt: -1 });

    res.json({ success: true, requests });
  } catch (err) {
    next(err);
  }
};

// @route  PATCH /api/requests/:id/cancel
export const cancelRequest = async (req, res, next) => {
  try {
    const request = await BloodRequest.findOne({ _id: req.params.id, seeker: req.user._id });
    if (!request) {
      res.status(404);
      throw new Error("Request not found");
    }
    request.status = "cancelled";
    await request.save();
    res.json({ success: true, request });
  } catch (err) {
    next(err);
  }
};
