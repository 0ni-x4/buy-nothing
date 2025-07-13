"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleBuyNothing = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
      alert("Error: Unable to start checkout.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <Button
          onClick={handleBuyNothing}
          disabled={loading}
          className="bg-white text-black font-medium px-12 py-6 text-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.05)] border border-gray-200 hover:bg-[#f5f5f5] hover:shadow-[inset_0_1px_2px_rgba(0,0,0,0.08),inset_0_-2px_4px_rgba(255,255,255,0.9),0_1px_3px_rgba(0,0,0,0.08)] active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-1px_2px_rgba(255,255,255,0.6)] transition-all duration-150 rounded-full"
        >
          Buy Nothing: $10
        </Button>
        <p className="mt-4" style={{ fontSize: "10px" }}>
          <span className="text-gray-400">
            By purchasing, you agree to our{" "}
            <Link href="/terms" className="underline">
              Terms & Policies
            </Link>
            .
          </span>
        </p>
      </div>
    </div>
  );
}
