import { serverMutation } from "../core/server";

export const createClass = async (classData) => {
    return serverMutation("classes", "POST", classData);
};