// This will be fully built out in Step 2 (Navbar + Hero), Step 3 (Why Donate,
// Benefits, Services, How It Works) and Step 4 (Blood Groups, FAQ,
// Testimonials, CTA, Footer). Kept minimal here just so the app runs.
export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">
        Donate Blood, <span className="text-brand-600">Save Lives.</span>
      </h1>
      <p className="max-w-md text-gray-500 dark:text-gray-400">
        Connect blood donors with people in need through one secure platform.
      </p>
      <p className="text-sm text-gray-400">
        🚧 পূর্ণ ল্যান্ডিং পেজ Step 2-4 এ আসছে
      </p>
    </div>
  );
}
