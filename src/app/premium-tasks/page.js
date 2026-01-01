"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function PremiumTasks() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [message, setMessage] = useState("");

  function completePaidTask(id, cost = 10, reward = 50) {
    if (!email) return setMessage("Please sign in to do premium tasks.");
    const key = "earnings";
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    if (!data[email]) data[email] = { balance: 0, completed: {} };
    if (data[email].balance < cost)
      return setMessage("Insufficient balance to start this paid task.");
    if (data[email].completed[id]) return setMessage("Task already completed.");
    data[email].balance -= cost;
    // simulate completing
    data[email].completed[id] = true;
    data[email].balance += reward;
    localStorage.setItem(key, JSON.stringify(data));
    setMessage(`Paid task complete! Net +${reward - cost} coins.`);
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Premium Tasks (paid)</h2>
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <div className="font-semibold">High-value research task</div>
          <div className="mt-2 flex gap-2">
            <button
              className="rounded bg-purple-600 px-3 py-1 text-white"
              onClick={() => completePaidTask("research_1", 10, 60)}
            >
              Start (-10) / Complete (+60)
            </button>
          </div>
        </div>

        {message && <div className="mt-4">{message}</div>}
      </div>
    </div>
  );
}
