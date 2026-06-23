import { serverDelete, serverMutation } from "../core/server";

export const createClass = async (classData) => {
    return serverMutation("classes", "POST", classData);
};

export const deleteClass = async (classId) => {
    return serverDelete(`classes/${classId}`);
}

export const updateClass = async (classId, updatedData) => {
    return serverMutation(`classes/${classId}`, "PATCH", updatedData);
}

export const handleClassStatusAction = async (classId, action) => {
    return await serverMutation("classes/manage/review", "PATCH", { classId, action });
};