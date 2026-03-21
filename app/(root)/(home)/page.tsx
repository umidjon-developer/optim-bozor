import { getProducts } from "@/actions/user.action";
import Pagination from "@/components/shared/pagination";
import { Separator } from "@/components/ui/separator";
import { SearchParams } from "@/types";
import { FC, Suspense } from "react";
import Banner from "../_components/banner";
import CategoryCards from "../_components/category-cards";
import Footer from "../_components/footer";
import HeroSection from "../_components/hero-section";
import TrustBadgesSection from "../_components/trust-badges";
import FeaturedProducts from "../_components/featured-products";
import {
  ProductGridSkeleton,
  HeroSkeleton,
  BannerSkeleton,
} from "../_components/skeletons";

export interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export interface CategoriesResponse {
  categories: Category[];
}

interface Props {
  searchParams: SearchParams;
}

const Page: FC<Props> = async (props) => {
  const searchParams = props.searchParams;
  const res = await getProducts({
    searchQuery: `${searchParams.q || ""}`,
    filter: `${searchParams.filter || ""}`,
    category: `${searchParams.category || ""}`,
    page: `${searchParams.page || "1"}`,
    pageSize: "8", // Show 8 products on homepage
  });

  const products = res?.data?.products || [];
  const isNext = res?.data?.isNext || false;

  return (
    <>
      {/* Premium Hero Section */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      {/* Trust Badges & Features */}
      <TrustBadgesSection />

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Banner */}
        <div className="w-full mb-8">
          <Suspense fallback={<BannerSkeleton />}>
            <Banner />
          </Suspense>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <CategoryCards />
        </div>

        <Separator className="my-8" />

        {/* Featured Products */}
        {products.length > 0 ? (
          <FeaturedProducts
            products={products}
            title="Trending Now"
            subtitle="Best Sellers"
          />
        ) : (
          <ProductGridSkeleton />
        )}

        {/* Pagination */}
        {products.length > 0 && (
          <div className="mt-12">
            <Pagination
              isNext={isNext}
              pageNumber={
                searchParams?.page?.toString()
                  ? +searchParams.page.toString()
                  : 1
              }
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Page;
