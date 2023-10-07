"use client";
import { scrapAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";
const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const isValidAmazonProductUrl = (url: string) => {
    try {
      const paredURL = new URL(url);
      const hostname = paredURL.hostname;

      if (
        hostname.includes("amazon.com") ||
        hostname.includes("amazon.") ||
        hostname.includes("amzn.") ||
        hostname.includes("amazon")
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidLink = isValidAmazonProductUrl(search);

    if (!isValidLink) {
      return alert("Please enter a valid Amazon product link");
    }
    try {
      setLoading(true);
      const product = await scrapAndStoreProduct(search)
      console.log(product);
      
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Your Product Link"
        className="searchbar-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading || !search}
        className="searchbar-btn"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
