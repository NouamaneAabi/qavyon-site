import type { Metadata } from "next";
import QuickScanWizard from "@/components/QuickScanWizard";

export const metadata: Metadata = {
  title: "QuickScan — Diagnostic gratuit en 3 minutes",
  description: "7 questions sur votre ERP, votre data, votre IA et votre OT/IT. Un diagnostic concret, pas un formulaire de contact.",
  alternates: { canonical: "/quickscan" },
};

export default function QuickScanPage() {
  return (
    <section className="container-qv py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="eyebrow mb-3">QuickScan</p>
        <h1 className="text-4xl font-bold md:text-5xl">Votre diagnostic en 3 minutes.</h1>
        <p className="mt-4 text-mist">
          Pas un formulaire de contact. 7 questions, un facteur limitant identifié, une prochaine étape concrète.
        </p>
      </div>
      <QuickScanWizard />
    </section>
  );
}
