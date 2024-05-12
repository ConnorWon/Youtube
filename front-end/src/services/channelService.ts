import {
    BaseResponse,
    ChannelDataResponse,
    CondensedChannelData,
    ManyCondensedChannelDataResponse
} from "../types/types";
import axiosInstance from "./axiosConfig";
import {AxiosResponse} from "axios";

/**
 * Gets all the user's channels
 *
 * @returns {Promise<CondensedChannelData[]>}
 */
// TODO: possibly change return type to ManyCondensedChannelDataResponse
export const getUserChannels = async (): Promise<CondensedChannelData[]> => {
    try {
        const response = await axiosInstance.get("/channel/userindex/");
        let channels = [];
        for (let i = 0; i < response.data.length; i++) {
            channels.push(response.data[i]);
        }
        return channels;
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
};

/**
 * Changes channel user is on
 *
 * @param {string} tag - tag of channel user wants to switch to
 *
 * @return {Promise<ChannelDataResponse>}
 */
export const changeCurrentChannel = async (tag: string): Promise<ChannelDataResponse> => {
    try {
        return await axiosInstance.get("/channel/logged/" + tag);
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};

/**
 * Sets channel for user to default option
 *
 * @return {Promise<ChannelDataResponse>}
 */
export const setDefaultChannel = async (): Promise<ChannelDataResponse> => {
    try {
        return await axiosInstance.get("/channel/logged/");
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};

/**
 * Creates most bare-bones Channel for user. Only runs as part of creating a new user
 *
 * @param {string} name - name of new channel
 *
 * @return {Promise<Response>}
 */
export const createBaseChannel = async (name: string): Promise<ChannelDataResponse> => {
    try {
        return await axiosInstance.post("/channel/create/", {
            name: name,
        });
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};

/**
 * Creates Channel for user (doesn't affect any image fields)
 *
 * @param {string} name - name of new channel
 * @param {string} tag - tag of new channel
 *
 * @return {Promise<ChannelDataResponse>}
 */
export const createChannel = async (name: string, tag: string): Promise<ChannelDataResponse> => {
    try {
        return await axiosInstance.post("/channel/create/", {
            name: name,
            tag: "@" + tag,
            active_channel: true,
        });
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};

/**
 * Updates Channel for user (doesn't affect any image fields)
 *
 * @param {string} name - name to update to
 * @param {string} tag - tag to update to
 *
 * @return {Promise<ChannelDataResponse>}
 */
export const updateChannel = async (name: string, tag: string): Promise<ChannelDataResponse> => {
    try {
        return await axiosInstance.patch("/channel/update/", {
            name: name,
            tag: "@" + tag,
            active_channel: true,
        });
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};

/**
 * Upload image for channel image fields (profile_pic and banner). Only one at a time
 *
 * @param {FormData} imgFormData - form data with image data
 *
 * @return {Promise<ChannelDataResponse>}
 */
export const uploadImageForChannel = async (imgFormData: FormData): Promise<ChannelDataResponse> => {
    try {
        return axiosInstance.patch("/channel/image_upload/", imgFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};

/**
 * Gets all the channels in the database
 *
 * @return {Promise<ManyCondensedChannelDataResponse>} response from API (relevant response data: status_code)
 * or false if fails
 */
export const getAllChannels = async (): Promise<ManyCondensedChannelDataResponse> => {
    try {
        return await axiosInstance.get("/channel/index/");
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};

/**
 * Get Channel info
 *
 * @param {string} tag - tag of channel to get info of
 *
 * @returns {Promise<ChannelDataResponse>}
 */
export const getChannelInfo = async (tag: string): Promise<ChannelDataResponse> => {
    try {
        return await axiosInstance.get("/channel/info/" + tag);
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};

/**
 * Checks if user is subbed to channel
 *
 * @param {string} tag - tag of channel that user is checking if their subbed to
 *
 * @returns {Promise<AxiosResponse>}
 */
export const isSubbedTo = async (tag: string): Promise<AxiosResponse> => {
    try {
        return await axiosInstance.get("/channel/is_subbed/" + tag);
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};

/**
 * Subscribes user to channel
 *
 * @param {string} tag - tag of channel that user is subbing to
 *
 * @returns {Promise<BaseResponse>}
 */
export const subToChannel = async (tag: string): Promise<BaseResponse> => {
    try {
        return await axiosInstance.patch("/channel/subscribe/" + tag, {
            sub: true,
        });
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};

/**
 * Unsubscribes user from channel
 *
 * @param {string} tag - tag of channel that user is unsubscribing from
 *
 * @returns {Promise<BaseResponse>}
 */
export const unsubFromChannel = async (tag: string): Promise<BaseResponse> => {
    try {
        return await axiosInstance.patch("/channel/subscribe/" + tag);
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};

/**
 * Updates the subscription data related to the user's current logged channel
 *
 * @returns {Promise<ManyCondensedChannelDataResponse>}
 */
export const updateSubscriptionData = async (): Promise<ManyCondensedChannelDataResponse> => {
    try {
        return await axiosInstance.get("/channel/update_sub_list/");
    } catch (error: any) {
        console.log(error.message);
        return error.response;
    }
};