import axios from 'axios';
import settings from '@/config/environment';
import { store } from '@/store';
import { loginSuccess, logout } from '@/store/slices/authSlice';

const axiosInstance = axios.create({
    baseURL: settings.api.url,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

let isRefreshing = false;
type FailedRequest = {
    resolve: (token?: string | null) => void;
    reject: (error?: unknown) => void;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!error.response) {
            const networkError = {
                response: {
                    data: {
                        message: 'Unable to connect. Please check your internet connection and try again.',
                    },
                    status: 0,
                },
                message: error.message,
                code: error.code,
            };
            return Promise.reject(networkError);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axiosInstance(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                return Promise.reject(error);
            }

            try {
                const { data } = await axios.post(`${settings.api.url}/auth/refresh`, { refreshToken });

                store.dispatch(loginSuccess({ token: data.accessToken }));
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);

                axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
                originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;

                processQueue(null, data.accessToken);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.removeItem('refreshToken');
                store.dispatch(logout());
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        if (error.response?.status >= 500) {
            error.response.data = {
                ...error.response.data,
                message: error.response.data?.message || "We're experiencing technical difficulties. Please try again later.",
            };
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
