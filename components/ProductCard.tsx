import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";


interface Props {
    product: Product;
}

const ProductCard = ({ product} : Props) => {
    

    return (
        <Link className="product-card" href={`/products/${product._id}`}>
        <div className="product-card_img-container">
            <Image src={product.image} height={200} width={200} alt={product.title} />

        </div>
        <div className="flex flex-col gap-3">
            <h3 className="product-title">{product.title}</h3>
            <div className="flex justify-between" >
                <p className="text-black opacity-50 text-lg capitalize">{product.category}</p>
                <p className="text-black font-semibold text-lg ">
                    <span>{product?.currency}</span>
                    <span>{product?.currentPrice}</span>
                </p>
            </div>
        </div>
        </Link>
    );
};

export default ProductCard;
