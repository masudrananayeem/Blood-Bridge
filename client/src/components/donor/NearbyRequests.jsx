import { motion } from "framer-motion";
import { FiMapPin, FiNavigation } from "react-icons/fi";

const nearby = [
  { id: 1, hospital: "Ibn Sina Hospital", district: "Dhaka", upazila: "Dhanmondi", distance: "1.2 km", bloodGroup: "O+" },
  { id: 2, hospital: "Popular Diagnostic", district: "Dhaka", upazila: "Dhanmondi", distance: "2.8 km", bloodGroup: "A+" },
  { id: 3, hospital: "United Hospital", district: "Dhaka", upazila: "Gulshan", distance: "5.4 km", bloodGroup: "O+" },
];

export default function NearbyRequests() {
  return (
    <div className="max-w-2xl space-y-3">
      {nearby.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          className="glass-card flex items-center justify-between p-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400">
              <FiMapPin size={18} />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{n.hospital}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {n.upazila}, {n.district}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="mb-1 block rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">
              {n.bloodGroup}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <FiNavigation size={11} /> {n.distance}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
