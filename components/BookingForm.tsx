"use client";

import { useState, useEffect } from "react";
import { track } from "@/lib/tracking";

export default function BookingForm() {
  const [mounted, setMounted] = useState(false);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setError("Le consentement RGPD est requis pour vous recontacter.");
      return;
    }
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, company, consent, source: "book" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Une erreur est survenue.");
      }
      setStatus("success");
      track("booking_submitted");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  if (!mounted) return null;

  if (calendlyUrl) {
    return (
      <div className="card-surface p-8 text-center flex flex-col items-center">
        <p className="mb-6 text-mist">Choisissez le créneau qui vous convient directement dans notre agenda.</p>
        <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full max-w-sm">
          Ouvrir le calendrier
        </a>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="card-surface p-8 text-center">
        <p className="font-display text-xl font-semibold text-cyan">Demande envoyée.</p>
        <p className="mt-2 text-mist">Un ingénieur senior QAVYON vous recontacte sous 24h ouvrées.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface space-y-5 p-8">
      <div>
        <label htmlFor="firstName" className="mb-2 block text-sm text-mist">Prénom</label>
        <input
          id="firstName"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full rounded-sm border border-steel bg-obsidian px-4 py-3 text-ice placeholder:text-mist/50"
          placeholder="Votre prénom"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm text-mist">Email professionnel</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-sm border border-steel bg-obsidian px-4 py-3 text-ice placeholder:text-mist/50"
          placeholder="prenom@entreprise.com"
        />
      </div>
      <div>
        <label htmlFor="company" className="mb-2 block text-sm text-mist">Société (optionnel)</label>
        <input
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full rounded-sm border border-steel bg-obsidian px-4 py-3 text-ice placeholder:text-mist/50"
          placeholder="Nom de votre société"
        />
      </div>
      <label className="flex items-start gap-3 text-sm text-mist">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded-sm border-steel bg-obsidian accent-cyan"
        />
        <span>J'accepte que QAVYON me recontacte au sujet de ma demande, conformément à la politique de confidentialité.</span>
      </label>

      {error && <p className="text-sm text-impact">{error}</p>}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-60">
        {status === "loading" ? "Envoi en cours…" : "Prendre rendez-vous"}
      </button>
    </form>
  );
}
