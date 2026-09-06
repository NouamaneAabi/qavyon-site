import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
}

export default function HeroImage({ src, alt, className, overlay = true }: HeroImageProps) {
  return (
    <div className={cn("group relative isolate aspect-[3/2] overflow-visible rounded-2xl", className)}>
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-cyan/20 blur-3xl animate-pulse" />
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-steel/50 bg-carbon">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          loading="lazy"
        />
        {overlay && <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-cyan/20 animate-border-glow" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute left-0 top-0 h-full w-1/3 -translate-x-full transform bg-gradient-to-r from-transparent via-cyan/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[300%]" />
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-cyan/10 blur-3xl" />
    </div>
  );
}
