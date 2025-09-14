// app/menu/page.tsx
import CategoryMenu from "@/components/core/Menu/CategoryMenu";
import axios from "axios";
import React from "react";

// Add revalidation if using ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour

const MenuPage = async () => {
  let categories = [];
  let error = null;

  try {
    const res = await axios.get("http://localhost:3000/api/categories");

    if (res.data?.success) {
      categories = res.data.categories || [];
    } else {
      error = "Failed to load categories";
    }
  } catch (err) {
    console.error("Error fetching categories:", err);
    error = "Failed to load categories";
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full p-6 rounded-2xl border border-gray-200 shadow-sm bg-white text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full p-6 rounded-2xl border border-gray-200 shadow-sm bg-white text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No categories available
          </h2>
          <p className="text-gray-600">
            Check back later for our menu offerings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our delicious selection of dishes, carefully prepared with
            the finest ingredients.
          </p>
        </div>

        <CategoryMenu categories={categories} />
      </div>
    </div>
  );
};

export default MenuPage;
