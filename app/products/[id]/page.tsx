import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProduct } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};
const ProductDetails = async ({ params: { id } }: Props) => {
  const product = await getProductById(id);

  if (!product) redirect("/");
  const similartProducts = await getSimilarProduct(id);
  return (
    <div className="product-container">
      <div className="flex gap-28  xl:flex-row flex-col items-center ">
        <div>
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={480}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28] text-secondary font-semibold">
                {" "}
                {product.title}
              </p>
              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Producy
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={20}
                  height={20}
                />
                <span className="text-base text-black opacity-50">
                  {" "}
                  {product.reviewsCount}
                </span>
              </div>
              <div className="p-3 bg-white-200 rounded-10 ">
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>
              <div className="p-3 bg-white-200 rounded-10 ">
                <Image
                  src="/assets/icons/share.svg"
                  alt="share"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary text-bold">
                {product.currency}
                {formatNumber(product.currentPrice)}
              </p>
              <p className="text-[21px] text-secondary text-bold line-through">
                {product.currency}
                {formatNumber(product.originalPrice)}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={20}
                    height={20}
                  />
                  <span className="text-base text-black opacity-50">
                    {" "}
                    {product.stars || "25"}
                  </span>
                </div>
                <div className="product-reviews">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={20}
                    height={20}
                  />
                  <span className="text-base text-black font-semibold">
                    {" "}
                    {product.reviewsCount} Reviews
                  </span>
                </div>
              </div>
              <p>
                <span className="text-base text-black opacity-50">
                  Sold by:{" "}
                </span>
                <span className="text-base text-black font-semibold">
                  {product.seller}
                </span>
              </p>
            </div>
          </div>
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={product.currency + formatNumber(product.currentPrice)}
              />
              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={product.currency + formatNumber(product.averagePrice)}
              />
              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={product.currency + formatNumber(product.highestPrice)}
              />
              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={product.currency + formatNumber(product.lowestPrice)}
              />
            </div>
          </div>
          <Modal productId={id}  />
        </div>
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5 ">
          <h3 className="text-2xl text-secondary font-semibold">
            {" "}
            Product Description
          </h3>
          <div className="flex flex-col gap-4">
            {product?.description?.split("\n")}
          </div>
        </div>
        <button className="btn w-fil mx-auto flex items-center justify-center gap-3 min-w-[200px]">
          <Image
            src="/assets/icons/bag.svg"
            alt="check"
            width={20}
            height={20}
          />
          <Link href={product.url} target="_blank">
            Buy Now
          </Link>
        </button>
      </div>
      {similartProducts && similartProducts?.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text">Similar Products</p>
          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similartProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
