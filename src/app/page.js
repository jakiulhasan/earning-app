"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    // handle referral credit when user signs in with ?ref=CODE
    if (!session) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      const key = "earnings";
      if (!ref) return;
      const email = session.user.email;
      const processedKey = `ref_processed_${email}_${ref}`;
      if (localStorage.getItem(processedKey)) return;
      const data = JSON.parse(localStorage.getItem(key) || "{}");
      // find owner of ref
      let ownerEmail = null;
      for (const e in data) {
        if (data[e].ref === ref) {
          ownerEmail = e;
          break;
        }
      }
      if (!data[email]) data[email] = { balance: 0, completed: {}, ref: null };
      // credit both if owner exists and it's not the same user
      if (ownerEmail && ownerEmail !== email) {
        data[email].balance += 20;
        data[ownerEmail].balance = (data[ownerEmail].balance || 0) + 20;
        localStorage.setItem(key, JSON.stringify(data));
        localStorage.setItem(processedKey, "1");
      }
    } catch (e) {
      // ignore
    }
  }, [session]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold">Welcome to Earning App</h1>
      {session ? (
        <p className="mt-4">
          Hello {session.user.name}. Use navigation to find tasks and referral
          link.
        </p>
      ) : (
        <p className="mt-4">
          Sign in to start earning by completing tasks and referring friends.
        </p>
      )}
    </div>
  );
}
