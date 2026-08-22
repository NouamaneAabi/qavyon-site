import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Prendre rendez-vous — QAVYON",
  description: "Un échange de 30 minutes avec un ingénieur senior QAVYON.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <section className="container-qv py-20 md:py-28">
      <div className="mx-auto max-w-lg text-center">
        <p className="eyebrow mb-3">Book a Call</p>
        <h1 className="text-4xl font-bold md:text-5xl">30 minutes avec un ingénieur senior.</h1>
        <p className="mt-4 text-mist">Pas un commercial. Pas un formulaire qui disparaît dans un CRM.</p>
      </div>
      <div className="mx-auto mt-12 max-w-lg">
        <BookingForm />
      </div>
    </section>
  );
}
