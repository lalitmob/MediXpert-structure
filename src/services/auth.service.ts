/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import axiosInstance from "@/utils/interceptor";
import { API_ROUTES } from "@/config/apiRoutes";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface ForgotPasswordPayload {
    email: string;
}
export interface ResetPasswordPayload {
    token: string;
    password: string;
}


const login = async (payload: LoginPayload) => {
    return await axiosInstance.post(API_ROUTES.AUTH_LOGIN, payload);
};

const getUserProfile = async () => {
    return await axiosInstance.get(API_ROUTES.USER_PROFILE);
};

const forgotPassword = async (payload: ForgotPasswordPayload) => {
    return await axiosInstance.post(API_ROUTES.FORGOT_PASSWORD, payload);
};
const resetPassword = async (payload: ResetPasswordPayload) => {
    return await axiosInstance.post(API_ROUTES.RESET_PASSWORD, payload);
};

const signout = async () => {
    try {
        await axiosInstance.post(API_ROUTES.AUTH_LOGOUT);
    } catch (error) {
        console.warn('Backend logout failed, but clearing local state');
    }
};

export {
    login,
    getUserProfile,
    forgotPassword,
    resetPassword,
    signout,
};
