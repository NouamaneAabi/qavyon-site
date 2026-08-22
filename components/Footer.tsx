import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-steel bg-carbon">
      <div className="container-qv grid gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold text-ice">QAVYON</p>
          <p className="mt-3 text-sm text-mist">Make complexity work.</p>
        </div>
        <div>
          <p className="eyebrow mb-3">What We Solve</p>
          <ul className="space-y-2 text-sm text-mist">
            <li><Link href="/what-we-solve/erp-modernization-industrial" className="hover:text-cyan">Modernisation ERP</Link></li>
            <li><Link href="/what-we-solve/data-ai" className="hover:text-cyan">Data & IA</Link></li>
            <li><Link href="/what-we-solve/ot-it-integration" className="hover:text-cyan">Intégration OT/IT</Link></li>
            <li><Link href="/what-we-solve/industrial-ai" className="hover:text-cyan">IA industrielle</Link></li>
            <li><Link href="/what-we-solve/trust" className="hover:text-cyan">Sécurité & Gouvernance</Link></li>
            <li><Link href="/what-we-solve/nearshore-acceleration" className="hover:text-cyan">Nearshore</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Company</p>
          <ul className="space-y-2 text-sm text-mist">
            <li><Link href="/system" className="hover:text-cyan">The QAVYON System</Link></li>
            <li><Link href="/how-we-work" className="hover:text-cyan">How We Work</Link></li>
            <li><Link href="/about" className="hover:text-cyan">About</Link></li>
            <li><Link href="/insights" className="hover:text-cyan">Insights</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Start</p>
          <ul className="space-y-2 text-sm text-mist">
            <li><Link href="/quickscan" className="hover:text-cyan">QuickScan</Link></li>
            <li><Link href="/book" className="hover:text-cyan">Book a Call</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-steel py-6">
        <div className="container-qv flex flex-col gap-2 text-xs text-mist md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} QAVYON. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/legal/mentions" className="hover:text-cyan">Mentions légales</Link>
            <Link href="/legal/privacy" className="hover:text-cyan">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
