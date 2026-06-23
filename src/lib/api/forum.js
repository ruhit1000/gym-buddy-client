import { serverFetch } from "../core/server";

export const getAllForumPosts = async (params = {}) => {
  const { search = "", page = 1, limit = 15 } = params;

  const queryString = `forum?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`;

  return await serverFetch(queryString);
};

export const getForumPostDetails = async (postId) => {
  return await serverFetch(`forum/${postId}`);
};
