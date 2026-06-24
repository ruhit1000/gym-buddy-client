import { protectedFetch } from "../core/server"

export const getMyBookings = async () => {
    return protectedFetch("bookings/my-bookings")
}