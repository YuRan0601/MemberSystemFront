import { useUserStore } from "@/stores/userStore";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const userStore = useUserStore();

        if(userStore.token) {
            config.headers.Authorization = `Bearer ${userStore.token}`;
        }
        
        return config;
    },
    (error) => Promise.reject(error)
    
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const userStore = useUserStore();

        if(error.response) {
            const res = error.response;
            const status = res.status;
            const data = res.data;

            if(status === 401) {
                if(data?.code === 508 || data?.code === 509) {
                    alert('登入憑證已失效，請重新登入');
                    userStore.clearUser();

                    return Promise.reject(new Error('登入憑證已失效，請重新登入'));
                }
            }

            if(status === 403) {
                alert('權限不足，無法進行操作');
            }
        }
    }
);

export default axiosInstance;
