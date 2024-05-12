import {AxiosResponse} from "axios";
import axiosInstance from "./axiosConfig";
import {UserInfoResponse} from "../types/types";


/**
 * Logs a user in if they have a valid session cookie
 *
 * @returns {Promise<AxiosResponse>}
 */
export const loginValidatedUser = async (): Promise<AxiosResponse> => {
    try {
        return await axiosInstance.get("/logged/");
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};

/**
 * Logs user out
 *
 * @returns {Promise<AxiosResponse>}
 */
export const logout = async (): Promise<AxiosResponse> => {
    try {
        return await axiosInstance.post("/logout/");
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};

/**
 * Registers a user
 *
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * @return {Promise<AxiosResponse>}
 */
export const signUp = async (email: string, password: string): Promise<AxiosResponse>  => {
    try {
        return await axiosInstance.post("/register/", {
            email: email,
            password: password,
        });
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};

/**
 * Login user
 *
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * @return {Promise<AxiosResponse>} data field contains the error message sent from backend
 */
export const login = async (email: string, password: string): Promise<AxiosResponse> => {
    try {
        return await axiosInstance.post("/login/", {
            email: email,
            password: password,
        });
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};

/**
 * Gets all revealable user info
 *
 * @returns {Promise<UserInfoResponse>}
 */
export const getUserInfo = async (): Promise<UserInfoResponse> => {
    try {
        return await axiosInstance.get("/userinfo/");
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};