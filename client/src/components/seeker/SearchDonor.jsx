import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiSearch, FiShield, FiBookmark, FiPhone } from "react-icons/fi";
import bloodGroups from "../../utils/bloodGroups.js";
import districts from "../../utils/districts.js";
import { searchDonors, toggleSavedDonor } from "../../services/userService.js";
import Loader from "../common/Loader.jsx";

export default function SearchDonor() {
  const [filters, setFilters] = useState({ bloodGroup: "", district: "", upazila: "" });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [savedIds, setSavedIds] = useState(new Set());

  const handleChange = (e) => setFilters((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
      const { donors } = await searchDonors(cleanFilters);
      setDonors(donors);
    } catch {
      toast.error("সার্চ করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (donorId) => {
    try {
      const { saved } = await toggleSavedDonor(donorId);
      setSavedIds((prev) => {
        const next = new Set(prev);
        saved ? next.add(donorId) : next.delete(donorId);
        return next;
      });
      toast.success(saved ? "ডোনার সেভ করা হয়েছে" : "ডোনার সেভ থেকে সরানো হয়েছে");
    } catch {
      toast.error("সেভ করা যায়নি");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-white/5 dark:text-white";

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="glass-card grid grid-cols-1 gap-4 p-5 sm:grid-cols-4">
        <select name="bloodGroup" value={filters.bloodGroup} onChange={handleChange} className={inputClass}>
          <option value="">যেকোনো Blood Group</option>
          {bloodGroups.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select name="district" value={filters.district} onChange={handleChange} className={inputClass}>
          <option value="">যেকোনো District</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <input
          name="upazila"
          value={filters.upazila}
          onChange={handleChange}
          placeholder="Upazila"
          className={inputClass}
        />

        <button type="submit" className="btn-primary justify-center">
          <FiSearch /> Search
        </button>
      </form>

      {loading && <Loader />}

      {!loading && searched && donors.length === 0 && (
        <div className="glass-card p-12 text-center text-gray-500 dark:text-gray-400">
          কোনো ডোনার পাওয়া যায়নি — ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {donors.map((d, i) => (
          <motion.div
            key={d._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="glass-card p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              {d.photoURL ? (
                <img src={d.photoURL} alt="" className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient font-bold text-white">
                  {d.fullName.charAt(0)}
                </div>
              )}
              <div>
                <p className="flex items-center gap-1 font-semibold text-gray-900 dark:text-white">
                  {d.fullName}
                  {d.isVerified && <FiShield className="text-blue-500" size={14} />}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {d.upazila}, {d.district}
                </p>
              </div>
            </div>

            <span className="mb-4 inline-block rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">
              {d.bloodGroup}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => handleSave(d._id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-200 py-2 text-xs font-semibold text-gray-600 dark:border-white/10 dark:text-gray-300"
              >
                <FiBookmark size={14} /> {savedIds.has(d._id) ? "Saved" : "Save"}
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-gradient py-2 text-xs font-semibold text-white">
                <FiPhone size={14} /> Contact
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
