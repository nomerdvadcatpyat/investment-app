import axios, {Axios, AxiosInstance} from "axios"
import {UserInfoStorageService} from "./UserInfoStorageService";

export const FetchService: AxiosInstance = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

FetchService.interceptors.request.use(function (config) {
    const userInfo = UserInfoStorageService.getUserInfo()

    if (userInfo && userInfo.token) {
        if (!config.headers) {
            config.headers = {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        else {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
    }

    return config;
});

export const SERVER_URL = process.env.SERVER_URL || ''

export const fetcher = (url: string) => fetch(`${SERVER_URL}${url}`).then(response => response.json())