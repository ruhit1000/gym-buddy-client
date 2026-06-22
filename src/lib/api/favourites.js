import { protectedFetch, serverMutation } from "../core/server"

export const isFavourite = async (classId) => {
    return protectedFetch(`favorites/check?classId=${classId}`);
}

export const favouriteToggle = async (classId) => {
    return serverMutation(`favorites/toggle`, "POST", { classId });
}

export const getUserFavourites = async () => {
    return protectedFetch(`favorites/my-favorites`);
}