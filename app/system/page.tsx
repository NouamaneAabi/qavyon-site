import type { Metadata } from "next";
import QavyonSystem from "@/components/QavyonSystem";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La QAVYON System",
  description: "La QAVYON System : cinq couches connectées — Ops & OT, ERP, Data, IA, Software — entourées d'une couche de confiance transverse.",
  alternates: { canonical: "/system" },
};

export default function SystemPage() {
  return (
    <>
      <section className="container-qv py-20 md:py-28">
        <p className="eyebrow mb-3">La QAVYON System</p>
        <h1 className="max-w-2xl text-4xl font-bold md:text-5xl">
          La valeur naît de la connexion.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-mist">
          Chaque couche a de la valeur seule. Mais la valeur réelle apparaît quand elles fonctionnent ensemble — et c'est cette connexion que nous concevons.
        </p>
      </section>

      <section className="border-y border-steel bg-carbon">
        <div className="container-qv py-16 md:py-24">
          <QavyonSystem />
        </div>
      </section>

      <section className="container-qv py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Ops & OT → Software</h2>
            <p className="mt-4 text-mist">
              La donnée naît sur le terrain, se structure dans l'ERP, se fiabilise en couche Data, alimente l'IA, et ressort en valeur métier dans le Software que vos équipes utilisent chaque jour.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Trust, en transverse</h2>
            <p className="mt-4 text-mist">
              La sécurité et la gouvernance ne sont pas une couche de plus : elles enveloppent l'ensemble du système, du capteur jusqu'à l'application métier.
            </p>
          </div>
        </div>
        <Link href="/quickscan" className="btn-primary mt-10 inline-flex">Diagnostiquer mon système</Link>
      </section>
    </>
  );
}
