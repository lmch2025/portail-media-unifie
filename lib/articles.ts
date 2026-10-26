import fs from "fs";
import path from "path";

export interface ArticleIndexItem {
  slug: string;
  categorySlug: string;
  lang?: 'fr' | 'en';
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  wordCount: number;
  featuredImage?: string;
  affiliateType?: 'amazon_us' | 'amazon_fr' | 'hostinger' | 'whatsapp_cm' | 'stay22' | 'casino' | null;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface Article extends ArticleIndexItem {
  contentHtml: string;
  updatedAt?: string;
  humanScore: number;
  burstinessVerdict: string;
  summary30s: string[];
  fieldNotes: {
    fieldVerdict: string;
    practicalTip: string;
    warning: string;
    trapToAvoid: string;
    keyMetric: string;
  };
  faq: Array<{ question: string; answer: string }>;
  affiliateMeta?: {
    productName?: string;
    price?: string;
    affiliateUrl?: string;
    couponCode?: string;
    discount?: string;
    rating?: number;
    pros?: string[];
    aiCitationText?: string;
  };
}

// In-memory cache for ultra-fast Server-Side Rendering & SSG builds
let cachedIndex: ArticleIndexItem[] | null = null;
const cachedCategories = new Map<string, Article[]>();

function getDataDir(): string {
  return path.join(process.cwd(), "data");
}

export function getAllArticles(): ArticleIndexItem[] {
  if (cachedIndex) return cachedIndex;

  try {
    const indexPath = path.join(getDataDir(), "articles-index.json");
    if (fs.existsSync(indexPath)) {
      const data = fs.readFileSync(indexPath, "utf-8");
      cachedIndex = JSON.parse(data) as ArticleIndexItem[];
      return cachedIndex;
    }
  } catch (error) {
    console.error("Error reading articles index:", error);
  }

  return [];
}

export function getArticlesByCategory(categorySlug: string): ArticleIndexItem[] {
  const all = getAllArticles();
  return all.filter((a) => a.categorySlug === categorySlug);
}

export function getCategoryArticlesFull(categorySlug: string): Article[] {
  if (cachedCategories.has(categorySlug)) {
    return cachedCategories.get(categorySlug)!;
  }

  try {
    const catFile = path.join(getDataDir(), "categories", `${categorySlug}.json`);
    if (fs.existsSync(catFile)) {
      const raw = fs.readFileSync(catFile, "utf-8");
      const articles = JSON.parse(raw) as Article[];
      cachedCategories.set(categorySlug, articles);
      return articles;
    }
  } catch (error) {
    console.error(`Error loading category articles for ${categorySlug}:`, error);
  }

  return [];
}

export function getArticleBySlug(categorySlug: string, slug: string): Article | undefined {
  const articles = getCategoryArticlesFull(categorySlug);
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticles(): ArticleIndexItem[] {
  const all = getAllArticles();
  const priorityCategories = [
    "concours",
    "energie-solaire",
    "emploi",
    "hebergement-web",
    "espresso-cafe",
    "gadgets-amazon",
  ];

  const picked: ArticleIndexItem[] = [];
  for (const cat of priorityCategories) {
    const found = all.find((a) => a.categorySlug === cat);
    if (found) picked.push(found);
  }

  for (const a of all) {
    if (picked.length >= 6) break;
    if (!picked.some((p) => p.slug === a.slug)) {
      picked.push(a);
    }
  }

  return picked;
}

export function getRecentArticles(limit: number = 12): ArticleIndexItem[] {
  const all = getAllArticles();
  return all.slice(0, limit);
}
