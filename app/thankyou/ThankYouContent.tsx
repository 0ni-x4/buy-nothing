"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";
import { useEffect, useState, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ThankYouContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSessionId = searchParams.get("session_id");
  const [sessionId, setSessionId] = useState<string | null>(urlSessionId);
  const [buyer, setBuyer] = useState("Anonymous");
  const [loading, setLoading] = useState(true);
  const [authCode, setAuthCode] = useState<string | null>(null);
  const confettiFired = useRef(false);

  // On mount: if no sessionId in URL, check localStorage
  useEffect(() => {
    if (!urlSessionId) {
      const stored = localStorage.getItem("thankyou-certificate");
      if (stored) {
        try {
          const { sessionId: storedSessionId, authCode: storedAuthCode } = JSON.parse(stored);
          if (storedSessionId) {
            setSessionId(storedSessionId);
            if (storedAuthCode) setAuthCode(storedAuthCode);
            setLoading(false);
            return;
          }
        } catch {}
      }
      router.replace("/");
    } else {
      // Store sessionId immediately if not already stored
      const stored = localStorage.getItem("thankyou-certificate");
      if (!stored) {
        localStorage.setItem(
          "thankyou-certificate",
          JSON.stringify({ sessionId: urlSessionId })
        );
      } else {
        try {
          const parsed = JSON.parse(stored);
          if (!parsed.sessionId) {
            localStorage.setItem(
              "thankyou-certificate",
              JSON.stringify({ ...parsed, sessionId: urlSessionId })
            );
          }
        } catch {}
      }
    }
  }, [urlSessionId, router]);

  // Fetch buyer name if sessionId is present and not from localStorage
  useEffect(() => {
    if (sessionId && !authCode) {
      fetch(`/api/session?session_id=${sessionId}`)
        .then(res => {
          if (!res.ok) {
            router.replace("/");
            return null;
          }
          return res.json();
        })
        .then(data => {
          if (data && data.name) setBuyer(data.name);
        })
        .finally(() => setLoading(false));
    }
  }, [sessionId, authCode, router]);

  useEffect(() => {
    if (!confettiFired.current && !loading && sessionId) {
      confettiFired.current = true;
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#FFF", "#E5C100", "#F5F5F5", "#BFA14A"]
      });
    }
  }, [loading, sessionId]);

  const handleDownloadCertificate = useCallback(() => {
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 842, 595, "F");
    doc.setDrawColor(218, 165, 32);
    doc.setLineWidth(8);
    doc.rect(24, 24, 794, 547, "S");
    const centerY = 595 / 2;
    let y = centerY - 90;
    doc.setFontSize(40);
    doc.setTextColor(218, 165, 32);
    doc.setFont("times", "bold");
    doc.text("Certificate of Nothing", 421, y, { align: "center" });
    y += 40;
    doc.setFontSize(18);
    doc.setTextColor(120, 120, 120);
    doc.setFont("helvetica", "italic");
    doc.text("This certifies that", 421, y, { align: "center" });
    y += 32;
    doc.setFontSize(32);
    doc.setTextColor(34, 34, 34);
    doc.setFont("times", "bold");
    doc.text(buyer, 421, y, { align: "center" });
    y += 38;
    doc.setFontSize(18);
    doc.setTextColor(80, 80, 80);
    doc.setFont("helvetica", "normal");
    doc.text(
      `has paid $10 for this official certificate, which entitles them to absolutely nothing.`,
      421,
      y,
      { align: "center" }
    );
    y += 30;
    doc.setFontSize(12);
    doc.setTextColor(140, 140, 140);
    doc.setFont("times", "italic");
    doc.text(
      "This document is a testament to the recipient's unique ability to acquire nothing at all. It holds no monetary, legal, or practical value, and is issued solely for the purpose of amusement, novelty, and existential reflection. Display it proudly as proof of your commitment to the art of non-acquisition.",
      421,
      y,
      { align: "center", maxWidth: 600 }
    );
    y += 38;
    doc.setDrawColor(218, 165, 32);
    doc.setLineWidth(1);
    doc.line(221, y, 621, y);
    y += 24;
    doc.setFontSize(14);
    doc.setTextColor(120, 120, 120);
    doc.setFont("helvetica", "italic");
    doc.text(`Issued by buynothing.lol`, 421, y, { align: "center" });
    y += 20;
    const date = new Date().toLocaleDateString();
    doc.text(`Date: ${date}`, 421, y, { align: "center" });
    // Use existing code if present, else generate
    const code = authCode || Math.random().toString(36).substring(2, 10).toUpperCase();
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.setFont("helvetica", "normal");
    doc.text(`Authenticity Code: ${code}`, 790, 585, { align: "right" });
    doc.save("certificate-of-nothing.pdf");
    // Store in localStorage for future visits
    if (sessionId && !authCode) {
      localStorage.setItem(
        "thankyou-certificate",
        JSON.stringify({ sessionId, authCode: code })
      );
      setAuthCode(code);
    }
    fetch("/api/certificate-webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, buyer, date })
    });
  }, [buyer, sessionId, authCode]);

  if (!sessionId || loading) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-4 relative">
      <h1 className="text-4xl font-bold mb-2">Thank You!</h1>
      <div className="mb-6 text-lg text-gray-600">You successfully bought nothing.</div>
      
      <div className="flex gap-3">
        <Button size="sm" onClick={handleDownloadCertificate} className="bg-white text-black font-medium px-6 py-4 text-base shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.05)] border border-gray-200 hover:bg-[#f5f5f5] hover:shadow-[inset_0_1px_2px_rgba(0,0,0,0.08),inset_0_-2px_4px_rgba(255,255,255,0.9),0_1px_3px_rgba(0,0,0,0.08)] active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-1px_2px_rgba(255,255,255,0.6)] transition-all duration-150 rounded-full">
          Download Certificate Of Nothing
        </Button>
      </div>
      <Link
        href="/terms"
        className="underline text-xs text-gray-400 absolute left-1/2 -translate-x-1/2 bottom-4"
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 16 }}
      >
        Terms & Policies
      </Link>
    </main>
  );
} 