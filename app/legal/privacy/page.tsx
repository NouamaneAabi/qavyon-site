export const metadata = { title: "Politique de confidentialité — QAVYON" };

export default function PrivacyPage() {
  return (
    <section className="container-qv max-w-3xl py-20">
      <h1 className="text-3xl font-bold mb-8">Politique de confidentialité</h1>
      <div className="space-y-6 text-mist leading-relaxed">
        <p>
          QAVYON est une société en cours d'immatriculation. Les informations légales complètes (adresse, SIREN) seront publiées dès leur disponibilité.
        </p>
        <p>
          La présente politique de confidentialité décrit la manière dont nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez le site QAVYON (notamment les formulaires de contact et le QuickScan), conformément au Règlement Général sur la Protection des Données (RGPD).
        </p>

        <h2 className="text-xl font-semibold text-ice mt-8 mb-4">1. Données collectées et finalités</h2>
        <p>
          Nous collectons votre prénom, votre adresse e-mail professionnelle, ainsi que le nom de votre entreprise (facultatif). Ces données sont collectées dans le but exclusif de :
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Vous envoyer les résultats de votre diagnostic QuickScan.</li>
          <li>Vous recontacter suite à une demande de rendez-vous ou d'information.</li>
        </ul>
        <p>La base légale de ces traitements est votre consentement explicite recueilli via nos formulaires. Nous pouvons également nous appuyer sur notre intérêt légitime pour répondre à vos demandes et assurer le fonctionnement et la sécurité du site.</p>

        <h2 className="text-xl font-semibold text-ice mt-8 mb-4">2. Sous-traitance et partage des données</h2>
        <p>
          Les données collectées sont destinées à un usage strictement interne. Nous utilisons la solution tierce <strong>HubSpot</strong> pour la gestion de nos contacts (CRM). Les données sont transférées et stockées de manière sécurisée sur leurs serveurs. Nous ne revendons en aucun cas vos données à des tiers.
        </p>

        <h2 className="text-xl font-semibold text-ice mt-8 mb-4">3. Durée de conservation</h2>
        <p>
          Vos données personnelles sont conservées pour une durée maximale de 3 ans à compter de notre dernier contact, ou jusqu'à ce que vous retiriez votre consentement.
        </p>

        <h2 className="text-xl font-semibold text-ice mt-8 mb-4">4. Vos droits (RGPD)</h2>
        <p>
          Conformément à la réglementation en vigueur, vous disposez des droits suivants concernant vos données personnelles :
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Droit d'accès et de rectification.</li>
          <li>Droit à l'effacement (droit à l'oubli).</li>
          <li>Droit à la limitation du traitement.</li>
          <li>Droit d'opposition au traitement.</li>
        </ul>
        <p>
          Pour exercer ces droits, vous pouvez contacter notre Délégué à la Protection des Données (DPO) à l'adresse suivante : <strong>contact@qavyon.com</strong>.
        </p>
      </div>
    </section>
  );
}
