import { getFavourites } from "@/actions/user.action";
import Pagination from "@/components/shared/pagination";
import { SearchParams } from "@/types";
import React, { FC, Suspense } from "react";
import WatchListCard from "./watch-list.card";
import EmptyState from "./empty-state";
<<<<<<< HEAD
import { Heart } from "lucide-react";
=======
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a

interface Props {
  searchParams: SearchParams;
}

const Page: FC<Props> = async ({ searchParams }) => {
  const res = await getFavourites({
    searchQuery: `${searchParams.q || ""}`,
    filter: `${searchParams.filter || ""}`,
    page: `${searchParams.page || "1"}`,
    category: `${searchParams.category || ""}`,
  });

  const products = res?.data?.products || [];
  const isNext = res?.data?.isNext || false;

  return (
<<<<<<< HEAD
    <div className="min-h-screen">
      <div className="container max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(244,63,94,0.1))", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            <Heart className="w-5 h-5 text-rose-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Sevimlilar</h1>
            <p className="text-sm text-muted-foreground">
              {products.length > 0 ? `${products.length} ta saqlangan mahsulot` : "Saqlangan mahsulotlar"}
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <EmptyState
            title="Sevimlilar bo'sh"
            description="Yoqtirgan mahsulotlaringizni yurak belgisini bosib saqlang. Ular shu yerda ko'rinadi."
            ctaHref="/"
            ctaText="Mahsulotlarni ko'rish"
          />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((item) => (
                <Suspense key={item._id}>
                  <WatchListCard product={item} />
                </Suspense>
              ))}
            </div>
            <Pagination
              isNext={isNext}
              pageNumber={searchParams?.page?.toString() ? +searchParams.page.toString() : 1}
            />
          </>
        )}
      </div>
=======
    <div className="container max-w-7xl py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Favorites
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {products.length > 0 
            ? `${products.length} saved items` 
            : "Your saved products will appear here"
          }
        </p>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Save products you love by clicking the heart icon. They'll appear here for easy access."
          ctaHref="/"
          ctaText="Browse Products"
        />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {products.map((item) => (
              <Suspense key={item._id}>
                <WatchListCard product={item} />
              </Suspense>
            ))}
          </div>

          <Pagination
            isNext={isNext}
            pageNumber={
              searchParams?.page?.toString() ? +searchParams.page.toString() : 1
            }
          />
        </>
      )}
>>>>>>> 32a527e59bb40d0b6ca5d32175de1428908e676a
    </div>
  );
};

export default Page;
