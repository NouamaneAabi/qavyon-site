import type { Metadata } from "next";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { SOLUTIONS } from "@/lib/solutions-data";

const solution = SOLUTIONS["trust"];

export const metadata: Metadata = {
  title: solution.metaTitle,
  description: solution.metaDescription,
  alternates: { canonical: "/what-we-solve/trust" },
  openGraph: {
    title: solution.metaTitle,
    description: solution.metaDescription,
    url: "https://qavyon.com/what-we-solve/trust",
  },
};

export default function Page() {
  return <SolutionPageTemplate solution={solution} />;
}
