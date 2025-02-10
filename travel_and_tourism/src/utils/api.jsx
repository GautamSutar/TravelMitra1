import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BACKEND_BASEURL,
});

// Attach token to every request
API.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    } else {
        console.warn("No token found in sessionStorage!");
    }

    return config;
});

// Handle token expiration and refresh
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/refresh-token`,
                    {
                        refreshToken: sessionStorage.getItem("refreshToken"),
                    }
                );

                sessionStorage.setItem("token", data.accessToken);
                API.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`;

                return API(originalRequest);
            } catch (err) {
                console.error("Refresh token failed", err);
            }
        }

        return Promise.reject(error);
    }
);

export default API;
