"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

function Earnings({ userEmail }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!userEmail) return setBalance(0);
    const data = JSON.parse(localStorage.getItem("earnings") || "{}");
    setBalance(data[userEmail]?.balance || 0);
  }, [userEmail]);

  return <div className="ml-4">Balance: {balance} coins</div>;
}

export default function Header() {
  const { data: session } = useSession();
  const email = session?.user?.email;

  return (
    <header className="w-full border-b p-4 flex items-center justify-between bg-white">
      <nav className="flex items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/global-tasks">Global Tasks</Link>
        <Link href="/premium-tasks">Premium Tasks</Link>
        <Link href="/refer">Refer</Link>
      </nav>
      <div className="flex items-center">
        {session ? (
          <>
            <div className="mr-4">{session.user.name}</div>
            <Earnings userEmail={email} />
            <button
              className="ml-4 rounded bg-red-500 px-3 py-1 text-white"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            className="rounded bg-blue-600 px-3 py-1 text-white"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}
