import { serverMutation } from "../core/server";

export const manageUserAction = async (userId, action) => {
    return await serverMutation("users/manage", "PATCH", { userId, action });
};