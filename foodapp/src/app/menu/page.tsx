import CategoryMenu from "@/components/core/Menu/CategoryMenu";
import axios from "axios";
import React from "react";

const MenuPage = async () => {
  const res = await axios.get("http://localhost:3000/api/categories");

  return (
    <div className=" flex flex-col  items-center mt-6">
      <h1 className="text-3xl font-bold">Menu</h1>
      <p className="mt-4">Explore our delicious menu options.</p>
        <CategoryMenu categories={res.data?.categories} />
    </div>
  );
};

export default MenuPage;
