import { serverMutation } from "../core/server";

export const reviewTrainerApplication = async (reviewData) => {
  return await serverMutation("applied-trainers/review", "PATCH", reviewData);
};