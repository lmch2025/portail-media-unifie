interface AmazonCashflowProps {
  productName: string;
  price?: string;
  rating?: number;
  affiliateUrl: string;
  pros?: string[];
  isFr?: boolean;
}

export default function AmazonCashflowBox({
  productName,
  price,
  rating = 4.8,
  affiliateUrl,
  pros = [],
  isFr = false
}: AmazonCashflowProps) {
  return (
    <div className="my-8 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-orange-50 border-2 border-amber-300/80 p-6 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-white text-xs font-black uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow-xs">
        {isFr ? "Recommandation N°1 en France" : "Top Tested Amazon Choice 2026"}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-amber-500 text-lg font-black">★★★★★</span>
            <span className="text-xs font-bold text-slate-600 bg-amber-100 px-2 py-0.5 rounded-md">
              {rating} / 5 (Test en conditions réelles)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {productName}
          </h3>
          {price && (
            <p className="text-2xl font-black text-amber-600">
              {price} <span className="text-xs font-normal text-slate-500">{isFr ? "TTC sur Amazon.fr" : "on Amazon.com"}</span>
            </p>
          )}
        </div>

        <div className="shrink-0">
          <a
            href={affiliateUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-4 rounded-xl font-black text-base bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 min-h-[58px]"
          >
            <span>{isFr ? "Voir l'offre sur Amazon.fr →" : "Check Best Price on Amazon →"}</span>
          </a>
        </div>
      </div>

      {pros.length > 0 && (
        <div className="mt-5 pt-4 border-t border-amber-200/60">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            {isFr ? "Points forts constatés lors du test :" : "Why we recommend it:"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
            {pros.map((p, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
