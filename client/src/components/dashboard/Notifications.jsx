import { motion } from "framer-motion";
import { FiBell, FiCheckCircle, FiXCircle, FiShield } from "react-icons/fi";

/*
  NOTE: This renders sample notifications so the UI is fully navigable now.
  Step 10 replaces this with real data from the `Notifications` collection,
  fetched on load and updated live as new blood requests / responses arrive.
*/
const sampleNotifications = [
  { id: 1, type: "request", icon: FiBell, text: "নতুন একটি ব্লাড রিকোয়েস্ট এসেছে আপনার এলাকায়।", time: "৫ মিনিট আগে" },
  { id: 2, type: "accepted", icon: FiCheckCircle, text: "আপনার রিকোয়েস্ট একজন ডোনার গ্রহণ করেছেন।", time: "২ ঘণ্টা আগে" },
  { id: 3, type: "rejected", icon: FiXCircle, text: "একজন ডোনার আপনার রিকোয়েস্ট প্রত্যাখ্যান করেছেন।", time: "গতকাল" },
  { id: 4, type: "verified", icon: FiShield, text: "আপনার প্রোফাইল ভেরিফাই করা হয়েছে।", time: "৩ দিন আগে" },
];

const tintFor = {
  request: "text-brand-600 bg-brand-50 dark:bg-brand-950/40",
  accepted: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40",
  rejected: "text-red-500 bg-red-50 dark:bg-red-950/40",
  verified: "text-blue-600 bg-blue-50 dark:bg-blue-950/40",
};

export default function Notifications() {
  return (
    <div className="max-w-2xl space-y-3">
      {sampleNotifications.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="glass-card flex items-start gap-4 p-4"
        >
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tintFor[n.type]}`}>
            <n.icon size={18} />
          </div>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-200">{n.text}</p>
            <p className="mt-1 text-xs text-gray-400">{n.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
