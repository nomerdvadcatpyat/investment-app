import axios, { AxiosInstance } from "axios"

export const api: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.SERVER_URL,
})