import { getCategories } from "@/actions/user.action";
import Image from "next/image";
import Link from "next/link";

export interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export interface CategoriesResponse {
  categories: Category[];
}

function isUrlLike(src?: string) {
  if (!src) return false;
  return src.startsWith("/") || src.startsWith("http");
}

export default async function CategoryCards() {
  const data: CategoriesResponse = await getCategories();
  if (!data?.categories?.length) return null;

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
          Browse by Category
        </h2>
        <Link
          href="/catalog"
          className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
        >
          View all
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
        {data.categories.map((item, index) => {
          const href = `/catalog/${item.slug ? item.slug : item._id}`;
          const showImage = isUrlLike(item.image);
          
          // Generate gradient colors based on index for variety
          const gradients = [
            "from-purple-500/10 via-violet-500/10 to-indigo-500/10",
            "from-blue-500/10 via-cyan-500/10 to-teal-500/10",
            "from-pink-500/10 via-rose-500/10 to-orange-500/10",
            "from-emerald-500/10 via-green-500/10 to-teal-500/10",
            "from-amber-500/10 via-yellow-500/10 to-orange-500/10",
            "from-indigo-500/10 via-purple-500/10 to-pink-500/10",
          ];
          const gradientClass = gradients[index % gradients.length];
          
          return (
            <Link
              key={item._id}
              href={href}
              prefetch={false}
              aria-label={`${item.name} kategoriyasiga o'tish`}
              className="group relative overflow-hidden"
            >
              <div className="relative bg-gradient-to-br bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-800 shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:-translate-y-1">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative flex items-center gap-3 sm:gap-4 min-h-[56px]">
                  {showImage ? (
                    <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 ring-1 ring-gray-200/50 dark:ring-gray-700/50 overflow-hidden flex items-center justify-center group-hover:ring-purple-300 dark:group-hover:ring-purple-700 transition-all">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1.5"
                        sizes="56px"
                      />
                    </div>
                  ) : (
                    <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-indigo-500/10 ring-1 ring-purple-200/50 dark:ring-purple-800/50 flex items-center justify-center text-2xl group-hover:ring-purple-300 dark:group-hover:ring-purple-700 transition-all">
                      {item.image || "🏷️"}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <span className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100 leading-snug block group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">
                      Shop now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
