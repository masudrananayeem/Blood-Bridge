import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FiCheck, FiX, FiMapPin, FiClock } from "react-icons/fi";

/*
  NOTE: Sample requests for now so Accept/Reject is fully interactive.
  Step 10 (Emergency Request system) replaces this with real BloodRequest
  documents from MongoDB, and Accept/Reject will call
  PATCH /api/requests/:id/respond instead of just updating local state.
*/
const initialRequests = [
  { id: 1, seeker: "ফাহিম হাসান", bloodGroup: "O+", hospital: "Dhaka Medical College", district: "Dhaka", urgency: "High", time: "১০ মিনিট আগে" },
  { id: 2, seeker: "নুসরাত জাহান", bloodGroup: "O+", hospital: "Square Hospital", district: "Dhaka", urgency: "Medium", time: "১ ঘণ্টা আগে" },
];

const urgencyColor = {
  High: "bg-red-50 text-red-600 dark:bg-red-950/40",
  Medium: "bg-amber-50 text-amber-600 dark:bg-amber-950/40",
  Low: "bg-gray-100 text-gray-600 dark:bg-white/10",
};

export default function IncomingRequests() {
  const [requests, setRequests] = useState(initialRequests);

  const respond = (id, action) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    toast.success(action === "accept" ? "রিকোয়েস্ট গ্রহণ করা হয়েছে" : "রিকোয়েস্ট প্রত্যাখ্যান করা হয়েছে");
  };

  if (requests.length === 0) {
    return (
      <div className="glass-card p-12 text-center text-gray-500 dark:text-gray-400">
        এই মুহূর্তে কোনো নতুন রিকোয়েস্ট নেই।
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-4">
      <AnimatePresence>
        {requests.map((r) => (
          <motion.div
            key={r.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="glass-card p-5"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{r.seeker}</h4>
                <p className="flex items-center gap-1 text-xs text-gray-400">
                  <FiClock size={12} /> {r.time}
                </p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${urgencyColor[r.urgency]}`}>
                {r.urgency} Urgency
              </span>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">
                {r.bloodGroup}
              </span>
              <span className="flex items-center gap-1">
                <FiMapPin size={14} /> {r.hospital}, {r.district}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => respond(r.id, "accept")}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-gradient py-2.5 text-sm font-semibold text-white"
              >
                <FiCheck /> Accept
              </button>
              <button
                onClick={() => respond(r.id, "reject")}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 dark:border-white/10 dark:text-gray-300"
              >
                <FiX /> Reject
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
