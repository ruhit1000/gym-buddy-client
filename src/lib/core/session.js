'use server';
import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation";
import { protectedFetch } from "./server";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session?.user || null;
};

export const getServerUser = async () => {
    return await protectedFetch("users/me")
}

export const getUserToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session?.session.token || null;
}

export const requireRole = async (role) => {
    const user = await getUserSession();
    if (!user) {
        return redirect('/login');
    }
    if (user?.role !== role) {
        return redirect('/unauthorized');
    }
    return user;
}