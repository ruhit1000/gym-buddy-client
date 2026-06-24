import { serverMutation } from "../core/server";

export const createPostComment = async (postId, text) => {
    return await serverMutation(`forum/${postId}/comments`, "POST", { text });
};

export const togglePostVote = async (postId, action) => {
    return await serverMutation(`forum/${postId}/vote`, "PATCH", { action });
};

export const updateComment = async (commentId, text) => {
    return await serverMutation(`forum/comments/${commentId}`, "PATCH", { text });
};

export const deleteComment = async (commentId) => {
    return await serverMutation(`forum/comments/${commentId}`, "DELETE", {});
};

export const createForumPost = async (postData) => {
    return await serverMutation("forum", "POST", postData);
};