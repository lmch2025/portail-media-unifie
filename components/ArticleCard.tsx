import Link from "next/link";
import { Article, ArticleIndexItem } from "@/lib/articles";
import { getCategoryBySlug } from "@/lib/categories";

export default function ArticleCard({ article }: { article: Article | ArticleIndexItem }) {
  const category = getCategoryBySlug(article.categorySlug);

  return (
    <article className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-400 p-6 transition-all duration-200 hover:shadow-xl flex flex-col justify-between">
      <div className="space-y-3">
        {/* Category & Read Time */}
        <div className="flex items-center justify-between text-xs">
          {category && (
            <Link
              href={`/${category.slug}`}
              className="inline-flex items-center space-x-1.5 font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </Link>
          )}
          <span className="text-slate-400 font-medium">⏱️ {article.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
          <Link href={`/${article.categorySlug}/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
          {article.description}
        </p>
      </div>

      {/* Author & Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800">{article.author.name}</span>
            <span className="text-[10px] text-emerald-600 font-semibold">100% Certifié Humain</span>
          </div>
        </div>

        <Link
          href={`/${article.categorySlug}/${article.slug}`}
          className="text-xs font-black text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center"
        >
          Lire le guide →
        </Link>
      </div>
    </article>
  );
}
