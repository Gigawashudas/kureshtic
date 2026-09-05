import Link from "next/link";

interface KureshticLogoProps {
  href?: string;
  showWordmark?: boolean;
  className?: string;
}

export function KureshticLogo({ href = "/", showWordmark = true, className = "" }: KureshticLogoProps) {
  const logo = (
    <span className={`inline-flex items-center gap-3 ${className}`} aria-label="KURESHTIC">
      <span className="text-2xl font-bold tracking-[-0.05em] text-[var(--accent)]">K</span>

      {showWordmark && (
        <>
          <span aria-hidden="true" className="h-5 w-px bg-(--border-strong)" />

          <span className="text-lg font-semibold tracking-[-0.04em] text-(--text-primary)">KURESHTIC</span>
        </>
      )}
    </span>
  );

  return (
    <Link href={href} className="inline-flex">
      {logo}
    </Link>
  );
}
