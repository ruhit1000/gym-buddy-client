import { protectedFetch } from "../core/server"

export const getMyBookings = async () => {
    return protectedFetch("bookings/my-bookings")
}

export const hasUserBookedClass = async (classId) => {
    return protectedFetch(`bookings/check-booking?classId=${classId}`)
}