import Link from "next/link";
import GridParticles from "@/components/GridParticles";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-obsidian">
      <GridParticles />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,211,197,0.08),transparent_42%)]" />
      <div className="relative z-10 px-6 text-center">
        <p className="bg-gradient-to-b from-cyan via-cyan/70 to-transparent bg-clip-text font-display text-[clamp(120px,20vw,200px)] font-bold leading-none text-transparent opacity-80 drop-shadow-[0_0_28px_rgba(25,211,197,0.2)]">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-ice">
          Page introuvable. La connexion est rompue.
        </h1>
        <p className="mx-auto mt-2 max-w-md text-mist">
          Il semble que le signal se soit perdu. Revenez à la source.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-primary">
            Retour à l'accueil
          </Link>
          <Link href="/quickscan" className="btn-secondary">
            Lancer un QuickScan
          </Link>
        </div>
      </div>
    </div>
  );
}
