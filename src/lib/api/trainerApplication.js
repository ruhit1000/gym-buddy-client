import { protectedFetch, serverFetch, serverMutation } from "../core/server";

export const getTrainerApplications = async () => {
    return await protectedFetch('applied-trainers');
};

export const getAllTrainers = async () => {
    return await protectedFetch('trainers');
};

export const demoteTrainer = async (userId) => {
    return await serverMutation("applied-trainers/review", "PATCH", {
        userId,
        action: "reject", 
        feedback: "Demoted by platform administrator."
    });
};