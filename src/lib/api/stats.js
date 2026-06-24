import { protectedFetch } from "../core/server";

export const getUserDashboardStats = async () => {
    return await protectedFetch("user/dashboard-stats");
};