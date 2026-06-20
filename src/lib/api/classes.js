import { serverFetch } from "../core/server";

export const getAllClasses = async (options = {}) => {
  const { search, categories, page, limit } = options;
  const params = new URLSearchParams();

  if (search && search.trim() !== "") {
    params.append("search", search.trim());
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    params.append("category", categories.join(","));
  }

  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());

  const queryString = params.toString();
  const targetPath = queryString ? `classes?${queryString}` : "classes";

  return serverFetch(targetPath);
};

export const getAllCategories = async () => {
  return serverFetch("categories");
};

export const getMyClasses = async (trainerId) => {
  return await serverFetch(`classes/my-classes?trainerId=${trainerId}`);
};
