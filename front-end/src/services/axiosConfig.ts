import axios from "axios";
import {BACKEND_BASE_URL} from "../utils/Constants";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const axiosInstance = axios.create({
    baseURL: BACKEND_BASE_URL,
});

export default axiosInstance;