import axiosInstance from "./axiosInstance.js";

export const updateProfile = async (payload) => {
  const { data } = await axiosInstance.put("/users/profile", payload);
  return data;
};

export const toggleAvailability = async (isAvailable) => {
  const { data } = await axiosInstance.patch("/users/availability", { isAvailable });
  return data;
};

export const switchMode = async (mode) => {
  const { data } = await axiosInstance.patch("/users/mode", { mode });
  return data;
};

export const getDonationHistory = async () => {
  const { data } = await axiosInstance.get("/users/donation-history");
  return data;
};
