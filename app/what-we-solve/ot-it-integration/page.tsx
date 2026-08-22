import type { Metadata } from "next";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { SOLUTIONS } from "@/lib/solutions-data";

const solution = SOLUTIONS["ot-it-integration"];

export const metadata: Metadata = {
  title: solution.metaTitle,
  description: solution.metaDescription,
  alternates: { canonical: "/what-we-solve/ot-it-integration" },
  openGraph: {
    title: solution.metaTitle,
    description: solution.metaDescription,
    url: "https://qavyon.com/what-we-solve/ot-it-integration",
  },
};

export default function Page() {
  return <SolutionPageTemplate solution={solution} />;
}
