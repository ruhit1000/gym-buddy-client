import React from "react";
import { getAllClasses, getAllCategories } from "@/lib/api/classes"; 
import BrowseClassesContainer from "@/Components/AllClasses/BrowseClassesContainer";

export const metadata = {
  title: "Browse Training Classes - Gym Buddy",
  description: "Find your ideal workout program. Search and register for elite, verified fitness modules.",
};

const AllClassesPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const currentQuery = resolvedParams?.search || "";
  const currentCategory = resolvedParams?.category || "";
  const currentPage = resolvedParams?.page || 1;

  const categoriesResponse = await getAllCategories();
  const allUniqueCategories = categoriesResponse?.data || [];

  const response = await getAllClasses({
    search: currentQuery,
    categories: currentCategory ? [currentCategory] : [],
    page: currentPage,
    limit: 15
  });

  const classList = response?.data || [];
  const metaData = response?.meta || { currentPage: 1, totalPages: 1 };

  return (
    <BrowseClassesContainer 
      initialData={classList} 
      meta={metaData} 
      availableCategories={allUniqueCategories}
    />
  );
};

export default AllClassesPage;