"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Wallet, Target, Share2, ShieldCheck, ArrowRight } from "lucide-react"; // Optional: Install lucide-react

export default function Home() {
  const { data: session } = useSession();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // --- Your Original Referral Logic ---
    if (!session) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      const key = "earnings";
      if (!ref) return;

      const email = session.user?.email;
      if (!email) return;

      const processedKey = `ref_processed_${email}_${ref}`;
      if (localStorage.getItem(processedKey)) return;

      const data = JSON.parse(localStorage.getItem(key) || "{}");
      let ownerEmail = null;
      for (const e in data) {
        if (data[e].ref === ref) {
          ownerEmail = e;
          break;
        }
      }

      if (!data[email])
        data[email] = {
          balance: 0,
          completed: {},
          ref: Math.random().toString(36).substring(7),
        };

      if (ownerEmail && ownerEmail !== email) {
        data[email].balance += 20;
        data[ownerEmail].balance = (data[ownerEmail].balance || 0) + 20;
        localStorage.setItem(key, JSON.stringify(data));
        localStorage.setItem(processedKey, "1");
        setBalance(data[email].balance);
      }
    } catch (e) {
      console.error("Referral error", e);
    }
  }, [session]);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="pt-16 pb-8 text-center bg-gradient-to-b from-blue-50 to-white px-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Turn Your Time into <span className="text-blue-600">Earnings</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          The simplest way to earn rewards. Complete small tasks, share with
          friends, and watch your balance grow in real-time.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {!session ? (
            <button
              onClick={() => signIn()}
              className="rounded-full bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition"
            >
              Start Earning Now
            </button>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-sm font-medium text-gray-500 mb-2">
                Welcome back, {session.user?.name}!
              </p>
              <button className="rounded-full bg-green-600 px-8 py-4 text-white font-semibold flex items-center gap-2">
                <Wallet size={20} /> View Dashboard
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. STATS / BENEFITS SECTION */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="p-8 border rounded-2xl bg-white shadow-sm hover:shadow-md transition">
          <Target className="text-blue-500 mb-4" size={32} />
          <h3 className="text-xl font-bold">Daily Tasks</h3>
          <p className="text-gray-500 mt-2">
            New surveys and micro-tasks added every 24 hours.
          </p>
        </div>
        <div className="p-8 border rounded-2xl bg-white shadow-sm hover:shadow-md transition">
          <Share2 className="text-purple-500 mb-4" size={32} />
          <h3 className="text-xl font-bold">Referral Bonus</h3>
          <p className="text-gray-500 mt-2">
            Earn $20 instantly for every friend who joins using your link.
          </p>
        </div>
        <div className="p-8 border rounded-2xl bg-white shadow-sm hover:shadow-md transition">
          <ShieldCheck className="text-green-500 mb-4" size={32} />
          <h3 className="text-xl font-bold">Secure Payouts</h3>
          <p className="text-gray-500 mt-2">
            Verified payments directly to your wallet of choice.
          </p>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-8">
              <div className="flex gap-4">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <h4 className="font-bold">Create an Account</h4>
                  <p className="text-gray-600">
                    Sign in securely with your Google or Email account.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <h4 className="font-bold">Complete Tasks</h4>
                  <p className="text-gray-600">
                    Choose from a variety of tasks ranging from testing apps to
                    surveys.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <h4 className="font-bold">Get Paid</h4>
                  <p className="text-gray-600">
                    Withdraw your earnings once you reach the minimum threshold.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-white p-4 rounded-xl shadow-inner border">
              {/* Placeholder for an app screenshot or illustration */}
              <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center text-gray-400">
                [Platform Dashboard Preview]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACTIVE TASKS PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold">Available Tasks</h2>
            <p className="text-gray-500">
              Highest paying tasks available today
            </p>
          </div>
          <button className="text-blue-600 font-semibold flex items-center gap-1 hover:underline">
            View all <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border rounded-xl p-5 hover:border-blue-300 transition cursor-pointer"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg mb-4"></div>
              <h4 className="font-bold">Survey Task #{i}</h4>
              <p className="text-sm text-gray-500 mb-4">5-10 Minutes</p>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-green-600 font-bold">$5.00</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  Fast Pay
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. REFERRAL CTA SECTION */}
      <section className="max-w-5xl mx-auto px-6 w-full">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8 shadow-xl">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">
              Invite Friends & Earn More
            </h2>
            <p className="text-blue-100 mb-6 text-lg">
              Share your unique referral link and get{" "}
              <span className="font-bold text-white">$20.00</span> for every
              person who signs up. No limits on earnings!
            </p>
            {session ? (
              <div className="flex gap-2">
                <input
                  readOnly
                  value={`earningapp.com/?ref=USER_ID`}
                  className="bg-blue-700 border-none rounded-lg px-4 py-2 text-sm flex-1 outline-none"
                />
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm">
                  Copy
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold"
              >
                Get My Link
              </button>
            )}
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-white/20 blur-xl rounded-full"></div>
              <Share2 size={120} className="relative text-white opacity-90" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
