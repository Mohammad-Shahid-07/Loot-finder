import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import Searchbar from "@/components/Searchbar";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";

export default async function Home() {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="px-6  md:px-20 py-24 ">
        <div className="flex max-xl:flex-col items-center gap-16">
          <div className="flex flex-col justify-start">
            <p className="small-text">
              Smart Shopping Starts Here
              <Image
                src="/assets/icons/arrow-right.svg"
                height={17}
                width={17}
                alt="Arrow"
              />
            </p>
            <h1 className="head-text">
              Unleash The Power Of
              <br />
              <span className="text-primary">Loot</span>
              <span className="text-secondary">Finder</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>

            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((item: any) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </section>
    </>
  );
}
