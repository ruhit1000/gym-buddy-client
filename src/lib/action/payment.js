import { serverMutation } from "../core/server";

export const savePaymentBooking = async (bookingPayload) => {
  return await serverMutation("bookings", "POST", bookingPayload);
};