"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ReferPage() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [refCode, setRefCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!email) return;
    const key = "earnings";
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    if (!data[email]) data[email] = { balance: 0, completed: {}, ref: null };
    if (!data[email].ref) {
      data[email].ref = uuidv4().slice(0, 8);
      localStorage.setItem(key, JSON.stringify(data));
    }
    setRefCode(data[email].ref);
  }, [email]);

  function copyLink() {
    if (!refCode) return;
    const url = `${location.origin}/?ref=${refCode}`;
    navigator.clipboard.writeText(url);
    setMessage("Referral link copied to clipboard.");
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Refer & Earn</h2>
      {!email ? (
        <div>Please sign in to get your referral link.</div>
      ) : (
        <div className="space-y-4">
          <div>
            Your referral code: <strong>{refCode}</strong>
          </div>
          <button
            className="rounded bg-blue-600 px-3 py-1 text-white"
            onClick={copyLink}
          >
            Copy Link
          </button>
          <div className="text-sm text-zinc-600">
            When someone signs up with your code, both get +20 coins.
          </div>
          {message && <div className="mt-2">{message}</div>}
        </div>
      )}
    </div>
  );
}
