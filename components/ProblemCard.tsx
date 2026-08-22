"use client";

import Link from "next/link";
import { track } from "@/lib/tracking";

interface ProblemCardProps {
  title: string;
  href: string;
  index: number;
}

export default function ProblemCard({ title, href, index }: ProblemCardProps) {
  return (
    <Link
      href={href}
      onClick={() => track("problem_entry_click", { problem: title })}
      className="card-surface group flex flex-col justify-between p-6 transition-colors duration-200 hover:border-cyan animate-converge"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <p className="font-display text-lg font-semibold text-ice group-hover:text-cyan md:text-xl">
        « {title} »
      </p>
      <span className="mt-6 inline-flex items-center gap-1 text-sm text-mist group-hover:text-cyan">
        Voir la solution
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
