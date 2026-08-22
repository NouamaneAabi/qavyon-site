import type { Metadata } from "next";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";
import { SOLUTIONS } from "@/lib/solutions-data";

const solution = SOLUTIONS["nearshore-acceleration"];

export const metadata: Metadata = {
  title: solution.metaTitle,
  description: solution.metaDescription,
  alternates: { canonical: "/what-we-solve/nearshore-acceleration" },
  openGraph: {
    title: solution.metaTitle,
    description: solution.metaDescription,
    url: "https://qavyon.com/what-we-solve/nearshore-acceleration",
  },
};

export default function Page() {
  return <SolutionPageTemplate solution={solution} />;
}
