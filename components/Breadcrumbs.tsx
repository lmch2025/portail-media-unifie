import Link from "next/link";

const SITE_URL = "https://www.kidenzo.store";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  // Always include Home ("Accueil") at position 1 with full absolute URL
  const allCrumbs: { label: string; url?: string }[] = [
    { label: "Accueil", url: `${SITE_URL}/` },
  ];

  for (const item of items) {
    let fullUrl: string | undefined = undefined;
    if (item.href) {
      fullUrl = item.href.startsWith("http")
        ? item.href
        : `${SITE_URL}${item.href.startsWith("/") ? "" : "/"}${item.href}`;
    }
    allCrumbs.push({
      label: item.label,
      url: fullUrl,
    });
  }

  // Schema.org BreadcrumbList fully compliant with Google Search Central guidelines:
  // Every ListItem has: @type: "ListItem", position (1, 2, 3...), name.
  // "item" field contains the absolute canonical URL (fixes "URL non valide dans le champ 'id'").
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allCrumbs.map((crumb, index) => {
      const entry: {
        "@type": string;
        position: number;
        name: string;
        item?: string;
      } = {
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.label,
      };
      if (crumb.url) {
        entry.item = crumb.url;
      }
      return entry;
    }),
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
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={i} className="flex items-center space-x-2">
              <span className="text-slate-300">/</span>
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-blue-600 transition truncate max-w-[200px] sm:max-w-none">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-slate-800 truncate max-w-[220px] sm:max-w-none">
                  {item.label}
                </span>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
