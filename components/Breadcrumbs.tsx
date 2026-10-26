import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href ? { "item": item.href } : {})
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Fil d'Ariane" className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 py-3 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-blue-600 transition flex items-center">
          <span>🏠 Accueil</span>
        </Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center space-x-2">
            <span className="text-slate-300">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-600 transition truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-slate-800 truncate max-w-[220px] sm:max-w-none">
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
