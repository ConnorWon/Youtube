import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

/**
 * Logs a user in if they have a valid session cookie
 *
 * @returns {Promise<Response>} response from API that holds user's id or null
 */
export const userIsLogged = async () => {
  try {
    const response = await client.get("/logged/");
    return response;
  } catch {
    return null;
  }
};

/**
 * Gets all of the user's channels
 *
 * @returns {Array<Channel>|Boolean} list of user's channels or false if fails
 */
export const getUserChannels = async () => {
  try {
    const response = await client.get("/channel/userindex/");
    var channels = [];
    for (var i = 0; i < response.data.length; i++) {
      channels.push(response.data[i]);
    }
    return channels;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

/**
 * Logs user out
 *
 * @returns {Boolean} true if successful and false otherwise
 */
export const logout = async () => {
  try {
    await client.post("/logout/");
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

/**
 * Changes channel user is on
 *
 * @param {string} tag - tag of channel user wants to switch to
 *
 * @return {Promise<Response>} response from API (relevant response data: status_code, pass data)
 */
export const changeCurrentChannel = async (tag) => {
  try {
    const response = await client.get("/channel/logged/" + tag);
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Sets channel for user to default option
 *
 * @return {Promise<Response>} response from API (relevant response data: status_code, pass data)
 */
export const setDefaultChannel = async () => {
  try {
    const response = await client.get("/channel/logged/");
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Registers a user
 *
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * @return {Promise<Response>} response from API (relevant response data: status_code, error data)
 */
export const signUp = async (email, password) => {
  try {
    const response = await client.post("/register/", {
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Login user
 *
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * @return {Promise<Response>} response from API (relevant response data: status_code, data)
 */
export const login = async (email, password) => {
  try {
    const response = await client.post("/login/", {
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Creates most bare bone Channel for user. Only runs as part of creating a new user
 *
 * @param {string} name - name of new channel
 *
 * @return {Promise<Response>} response from API (relevant response data: status_code, error data)
 */
export const createBaseChannel = async (name) => {
  try {
    const response = await client.post("/channel/create/", {
      name: name,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Creates Channel for user (doesn't affect any image fields)
 *
 * @param {string} name - name of new channel
 * @param {string} tag - tag of new channel
 *
 * @return {Promise<Response>} response from API (relevant response data: status_code, error data)
 */
export const createChannel = async (name, tag) => {
  try {
    const response = await client.post("/channel/create/", {
      name: name,
      tag: "@" + tag,
      active_channel: true,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Updates Channel for user (doesn't affect any image fields)
 *
 * @param {string} name - name to update to
 * @param {string} tag - tag to update to
 *
 * @return {Promise<Response>} response from API (relevant response data: status_code)
 */
export const updateChannel = async (name, tag) => {
  try {
    const response = await client.patch("/channel/update/", {
      name: name,
      tag: "@" + tag,
      active_channel: true,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Upload image for channel image fields (profile_pic and banner). Only one at a time
 *
 * @param {FormData} imgFormData - form data with image data
 *
 * @return {Promise<Response>} response from API (relevant response data: data, status_code)
 */
export const uploadImageForChannel = async (imgFormData) => {
  try {
    const response = client.patch("/channel/image_upload/", imgFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Gets all the channels in the database
 *
 * @return {Promise<Response>|Boolean} response from API (relevant response data: status_code)
 * or false if fails
 */
export const getAllChannels = async () => {
  try {
    const response = await client.get("/channel/index/");
    return response;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

/**
 * Gets all revealable user info
 *
 * @returns {Promise<Response>} response from API (relevant response data: status_code, pass data)
 */
export const getUserInfo = async (uid) => {
  try {
    const response = await client.get("/userinfo/" + uid);
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Get Channel info
 *
 * @param {string} tag - tag of channel to get info of
 *
 * @returns {Promise<Response>} response from API (relevant response data: status_code, pass data)
 */
export const getChannelInfo = async (tag) => {
  try {
    const response = await client.get("/channel/info/" + tag);
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Checks if user is subbed to channel
 *
 * @param {string} tag - tag of channel that user is checking if their subbed to
 *
 * @returns {Promise<Response>} response from API (relevant response data: status_code, pass data)
 */
export const isSubbedTo = async (tag) => {
  try {
    const response = await client.get("/channel/is_subbed/" + tag);
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Subcribes user to channel
 *
 * @param {string} tag - tag of channel that user is subbing to
 *
 * @returns {Promise<Response>} response from API (relevant response data: status_code)
 */
export const subToChannel = async (tag) => {
  try {
    const response = await client.patch("/channel/subscribe/" + tag, {
      sub: true,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Unsubcribes user from channel
 *
 * @param {string} tag - tag of channel that user is unsubbing from
 *
 * @returns {Promise<Response>} response from API (relevant response data: status_code)
 */
export const unsubFromChannel = async (tag) => {
  try {
    const response = await client.patch("/channel/subscribe/" + tag);
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Updates the subscription data related to the user's current logged channel
 *
 * @returns {Promise<Response>} response from API (relevant data: status code, pass data)
 */
export const updateSubscriptionData = async () => {
  try {
    const response = await client.get("/channel/update_sub_list/");
    return response;
  } catch (error) {
    return error.response;
  }
};
