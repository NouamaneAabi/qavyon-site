"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@/lib/tracking";

type ContactIntent = "question" | "nearshore";

const COPY = {
  question: {
    endpoint: "/api/contact-question",
    event: "contact_question_submit",
    button: "Envoyer ma question",
    success: "Reçu. Un ingénieur vous répond sous 2-3 jours ouvrés.",
  },
  nearshore: {
    endpoint: "/api/contact-nearshore",
    event: "contact_nearshore_submit",
    button: "Décrire mon besoin",
    success: "Reçu. Nous revenons vers vous rapidement avec ce que nous pouvons mobiliser.",
  },
} as const;

export default function ContactIntentForm({ intent }: { intent: ContactIntent }) {
  const copy = COPY[intent];
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) {
      setError("Le consentement RGPD est requis.");
      return;
    }

    setStatus("loading");
    setError(null);
    try {
      const response = await fetch(copy.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, company, message, consent }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Une erreur est survenue.");
      setStatus("success");
      track(copy.event);
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "Une erreur est survenue.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-cyan/40 bg-cyan/5 p-5" role="status">
        <p className="font-display font-semibold text-cyan">{copy.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor={`${intent}-firstName`} className="mb-2 block text-sm text-mist">Prénom</label>
        <input id={`${intent}-firstName`} required value={firstName} onChange={(event) => setFirstName(event.target.value)} className="w-full rounded-sm border border-steel bg-obsidian px-3 py-2 text-ice placeholder:text-mist/50" />
      </div>
      <div>
        <label htmlFor={`${intent}-email`} className="mb-2 block text-sm text-mist">Email professionnel</label>
        <input id={`${intent}-email`} type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-sm border border-steel bg-obsidian px-3 py-2 text-ice placeholder:text-mist/50" placeholder="prenom@entreprise.com" />
      </div>
      <div>
        <label htmlFor={`${intent}-company`} className="mb-2 block text-sm text-mist">Société (optionnel)</label>
        <input id={`${intent}-company`} value={company} onChange={(event) => setCompany(event.target.value)} className="w-full rounded-sm border border-steel bg-obsidian px-3 py-2 text-ice placeholder:text-mist/50" />
      </div>
      <div>
        <label htmlFor={`${intent}-message`} className="mb-2 block text-sm text-mist">
          {intent === "question" ? "Votre question" : "Compétences recherchées"}
        </label>
        <textarea id={`${intent}-message`} required maxLength={500} rows={4} value={message} onChange={(event) => setMessage(event.target.value)} className="w-full rounded-sm border border-steel bg-obsidian px-3 py-2 text-ice placeholder:text-mist/50" />
        <p className="mt-1 text-right text-xs text-mist">{message.length}/500</p>
      </div>
      <label className="flex items-start gap-3 text-sm text-mist">
        <input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 h-4 w-4 rounded-sm border-steel bg-obsidian accent-cyan" />
        <span>J'accepte que QAVYON utilise ces informations pour répondre à ma demande. Aucune prospection automatique. <Link href="/legal/privacy" className="text-cyan underline">Politique de confidentialité</Link></span>
      </label>
      {error && <p className="text-sm text-impact" role="alert">{error}</p>}
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-60">
        {status === "loading" ? "Envoi en cours…" : copy.button}
      </button>
    </form>
  );
}
