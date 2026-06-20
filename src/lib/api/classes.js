import { serverFetch } from "../core/server";

export const getMyClasses = async (trainerId) => {
    return await serverFetch(`classes/my-classes?trainerId=${trainerId}`);
}