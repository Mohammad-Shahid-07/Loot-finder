"use server";
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";

export async function scrapAndStoreProduct(productUrl: string) {
  if (!productUrl) {
    throw new Error("productUrl is required");
  }
  try {
    connectToDB();
    const scrapedProduct = await scrapAmazonProduct(productUrl);
    if (!scrapedProduct) {
      throw new Error("Product could not be scrapped");
    }
    let product = scrapedProduct;
    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if (existingProduct) {
      const updatePriceHistory: any = [
        ...existingProduct.priceHistory,
        {
          price: scrapedProduct.currentPrice,
        },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatePriceHistory,
        lowestPrice: getLowestPrice(updatePriceHistory),
        highestPrice: getHighestPrice(updatePriceHistory),
        averagePrice: getAveragePrice(updatePriceHistory),
      };
    }
    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );
    revalidatePath(`/products/$${newProduct._id}`);
    return newProduct;
  } catch (error: any) {
    throw new Error(`Error while scrapping product ${error.message}`);
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB();
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error: any) {
    throw new Error(`Error while getting product ${error.message}`);
  }
}

export async function getAllProduct() {
  try {
    connectToDB();
    const products = await Product.find({});

    return products;
  } catch (error: any) {
    throw new Error(`Error while getting all products ${error.message}`);
  }
}
export async function getSimilarProduct(ProductId: string) {
  try {
    connectToDB();
    const currentProduct = await Product.find({ ProductId });
    if (!currentProduct) {
      return null;
    }
    const similarProducts = await Product.find({
      _id: { $ne: ProductId },
    }).limit(3);
    return similarProducts;
  } catch (error: any) {
    throw new Error(`Error while getting Similar products ${error.message}`);
  }
}
export async function addUserEMailToProduct(
  productId: string,
  userEmail: string
) {
  try {
    const product = await Product.findById(productId);
    if (!product) return;

    const userExists = product.users.some(
      (user: User) => user.email === userEmail
    );

    if (!userExists) {
      product.users.push({ email: userEmail });

      await product.save();
      const emailContent = await generateEmailBody(product, "WELCOME");
      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}
