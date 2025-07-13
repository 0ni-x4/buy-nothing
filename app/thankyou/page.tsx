"use client";
export const dynamic = "force-dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";
import { useEffect, useState, useCallback } from "react";

export default function ThankYouPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [buyer, setBuyer] = useState("Anonymous");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      router.replace("/");
    } else {
      // Fetch session from our own API route to get the name
      fetch(`/api/session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.name) setBuyer(data.name);
        })
        .finally(() => setLoading(false));
    }
  }, [sessionId, router]);

  const handleDownloadCertificate = useCallback(() => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Certificate of Nothing", 20, 30);
    doc.setFontSize(14);
    doc.text(
      `This certifies that ${buyer} has purchased absolutely nothing.\n\nIssued by buynothing.lol`,
      20,
      50
    );
    doc.save("certificate-of-nothing.pdf");
  }, [buyer]);

  if (!sessionId || loading) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Thank You for Buying Nothing</h1>
      <p className="text-lg mb-8">You have successfully purchased absolutely nothing. Enjoy the void!</p>
      <button
        onClick={handleDownloadCertificate}
        className="mb-6 px-4 py-2 rounded bg-neutral-900 text-white border border-neutral-700 hover:bg-neutral-800 text-sm"
      >
        Download Certificate of Nothing (PDF)
      </button>
      <a
        href="/"
        className="px-6 py-2 rounded bg-neutral-900 text-white border border-neutral-700 hover:bg-neutral-800 transition"
      >
        Go Home
      </a>
    </main>
  );
} 