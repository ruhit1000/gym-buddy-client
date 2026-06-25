import { protectedFetch, serverFetch } from "../core/server";

export const getUserDashboardStats = async () => {
    return await protectedFetch("user/dashboard-stats");
};

export const getTrainerDashboardStats = async () => {
    return await protectedFetch("trainer/dashboard-stats");
};

export const getAdminDashboardStats = async () => {
    return await protectedFetch("admin/dashboard-stats");
};

export const featuredClasses = async () => {
    return await serverFetch('classes/featured');
};

export const latestForumPosts = async () => {
    return await serverFetch('forum/latest');
}