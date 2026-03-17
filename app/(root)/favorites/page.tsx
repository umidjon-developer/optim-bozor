import { getFavourites } from "@/actions/user.action";
import Pagination from "@/components/shared/pagination";
import { SearchParams } from "@/types";
import React, { FC, Suspense } from "react";
import WatchListCard from "./watch-list.card";
import EmptyState from "./empty-state";

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
    </div>
  );
};

export default Page;
