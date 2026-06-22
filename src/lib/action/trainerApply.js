import { serverMutation } from "../core/server";

export const applyForTrainer = async (applicationData) => {
  return await serverMutation("users/apply-trainer", "POST", applicationData);
};