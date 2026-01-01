"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function GlobalTasks() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [message, setMessage] = useState("");

  function completeTask(id, reward = 10) {
    if (!email) return setMessage("Please sign in to earn.");
    const key = "earnings";
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    if (!data[email]) data[email] = { balance: 0, completed: {} };
    if (data[email].completed[id]) return setMessage("Task already completed.");
    data[email].completed[id] = true;
    data[email].balance += reward;
    localStorage.setItem(key, JSON.stringify(data));
    setMessage(`Earned ${reward} coins!`);
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Global Tasks</h2>
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <div className="font-semibold">Watch a short video</div>
          <div className="mt-2 flex gap-2">
            <button
              className="rounded bg-green-600 px-3 py-1 text-white"
              onClick={() => completeTask("watch_video", 5)}
            >
              Complete (+5)
            </button>
          </div>
        </div>

        <div className="p-4 border rounded">
          <div className="font-semibold">Fill a quick survey</div>
          <div className="mt-2 flex gap-2">
            <button
              className="rounded bg-green-600 px-3 py-1 text-white"
              onClick={() => completeTask("survey", 15)}
            >
              Complete (+15)
            </button>
          </div>
        </div>

        {message && <div className="mt-4">{message}</div>}
      </div>
    </div>
  );
}
