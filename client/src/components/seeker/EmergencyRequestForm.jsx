import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiLoader, FiAlertTriangle } from "react-icons/fi";
import bloodGroups from "../../utils/bloodGroups.js";
import districts from "../../utils/districts.js";
import { createRequest } from "../../services/requestService.js";

export default function EmergencyRequestForm() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { urgency: "High", units: 1 } });

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await createRequest(formData);
      toast.success("রিকোয়েস্ট পাঠানো হয়েছে — কাছাকাছি ডোনাররা নোটিফিকেশন পাবেন।");
      navigate("/dashboard/seeker/my-requests");
    } catch {
      toast.error("রিকোয়েস্ট পাঠানো যায়নি, আবার চেষ্টা করুন।");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-white/5 dark:text-white";
  const errClass = "border-red-400";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-card max-w-2xl space-y-4 p-6">
      <div className="mb-2 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30">
        <FiAlertTriangle /> জরুরি প্রয়োজনে সঠিক তথ্য দিন — কাছাকাছি ডোনারদের কাছে সাথে সাথে নোটিফিকেশন যাবে।
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Blood Group</label>
          <select {...register("bloodGroup", { required: true })} className={`${inputClass} ${errors.bloodGroup ? errClass : ""}`}>
            <option value="">বেছে নিন</option>
            {bloodGroups.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Units Needed</label>
          <input
            type="number"
            min={1}
            {...register("units", { required: true, min: 1 })}
            className={`${inputClass} ${errors.units ? errClass : ""}`}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Hospital</label>
        <input
          {...register("hospital", { required: true })}
          placeholder="হাসপাতালের নাম"
          className={`${inputClass} ${errors.hospital ? errClass : ""}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">District</label>
          <select {...register("district", { required: true })} className={`${inputClass} ${errors.district ? errClass : ""}`}>
            <option value="">বেছে নিন</option>
            {districts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Upazila</label>
          <input
            {...register("upazila", { required: true })}
            className={`${inputClass} ${errors.upazila ? errClass : ""}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Urgency</label>
          <select {...register("urgency", { required: true })} className={inputClass}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Needed By</label>
          <input
            type="date"
            {...register("neededByDate", { required: true })}
            className={`${inputClass} ${errors.neededByDate ? errClass : ""}`}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Reason (ঐচ্ছিক)</label>
        <textarea {...register("reason")} rows={3} placeholder="সংক্ষেপে কারণ লিখুন" className={inputClass} />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
        {submitting ? <FiLoader className="animate-spin" /> : "Submit Emergency Request"}
      </button>
    </form>
  );
}
