import { useState } from "react";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AccountSettings() {
  const { user, logout } = useAuth();
  const [sending, setSending] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handlePasswordReset = async () => {
    setSending(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success("পাসওয়ার্ড রিসেট লিংক ইমেইলে পাঠানো হয়েছে");
    } catch {
      toast.error("লিংক পাঠানো যায়নি");
    } finally {
      setSending(false);
    }
  };

  const handleDeleteAccount = () => {
    // Full deletion (Firebase user + Mongo document + Cloudinary photo)
    // requires a dedicated backend endpoint — wired up alongside the
    // Admin "Manage Users" flow. For now this is a guarded confirm step.
    toast("অ্যাকাউন্ট ডিলিট ফিচারটি backend endpoint সহ পরে যুক্ত করা হবে।");
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="glass-card p-6">
        <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">Update Password</h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          আপনার ইমেইলে একটি পাসওয়ার্ড রিসেট লিংক পাঠানো হবে।
        </p>
        <button onClick={handlePasswordReset} disabled={sending} className="btn-primary">
          {sending ? <FiLoader className="animate-spin" /> : "Send Reset Link"}
        </button>
      </div>

      <div className="glass-card border border-red-200 p-6 dark:border-red-900/50">
        <h3 className="mb-1 font-semibold text-red-600">Delete Account</h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          এই কাজটি স্থায়ী — আপনার সব তথ্য মুছে যাবে। নিশ্চিত করতে নিচে <b>DELETE</b> লিখুন।
        </p>
        <input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="DELETE"
          className="mb-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-red-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
        <button
          onClick={handleDeleteAccount}
          disabled={confirmText !== "DELETE"}
          className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
}
