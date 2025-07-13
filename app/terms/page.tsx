import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto py-12">
        <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm mb-8 inline-block">
          ← Back
        </Link>

        <h1 className="text-3xl font-bold mb-8">Terms & Policies</h1>

        <div className="prose prose-gray max-w-none">
          <p className="mb-6">By using this website and/or completing a purchase, you agree to the following terms.</p>

          <h2 className="text-xl font-semibold mb-4">What You're Buying</h2>
          <p className="mb-4">
            This is a novelty digital experience. When you pay $10, you receive nothing in return — no product, no
            service, no entitlement. This is intentional.
          </p>
          <p className="mb-4">
            Something <span className="italic">may</span> happen after you pay. It might be nothing. It might be absurd. That's part of the experience.
          </p>
          <p className="mb-6">
            You're supporting a creative project that exists purely for entertainment and experimentation. If that
            doesn't make sense to you, don't purchase.
          </p>

          <h2 className="text-xl font-semibold mb-4">Refund Policy</h2>
          <p className="mb-4">All purchases are final. We do not offer refunds unless required by law.</p>
          <p className="mb-6">
            If you believe there was an error or unauthorized charge, contact us at support@klastra.ai.
          </p>

          <h2 className="text-xl font-semibold mb-4">Privacy</h2>
          <p className="mb-4">
            We collect your email address at checkout to send you a receipt and confirm your transaction. That's it.
          </p>
          <p className="mb-6">We do not use your data for marketing. We do not sell or share it with anyone.</p>

          <h2 className="text-xl font-semibold mb-4">Liability</h2>
          <p className="mb-6">
            This website is provided "as-is." We are not responsible for any consequences, confusion, satisfaction,
            disappointment, or philosophical realizations resulting from your purchase.
          </p>
        </div>
      </div>
    </div>
  )
}
