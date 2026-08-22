import type { Metadata } from "next";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { SOLUTIONS } from "@/lib/solutions-data";

const solution = SOLUTIONS["erp-modernization-industrial"];

export const metadata: Metadata = {
  title: solution.metaTitle,
  description: solution.metaDescription,
  alternates: { canonical: "/what-we-solve/erp-modernization-industrial" },
  openGraph: {
    title: solution.metaTitle,
    description: solution.metaDescription,
    url: "https://qavyon.com/what-we-solve/erp-modernization-industrial",
  },
};

export default function Page() {
  return <SolutionPageTemplate solution={solution} />;
}
