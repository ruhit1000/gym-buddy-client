import { protectedFetch } from "../core/server";

export const getTrainerApplications = async () => {
    return await protectedFetch('applied-trainers');
};