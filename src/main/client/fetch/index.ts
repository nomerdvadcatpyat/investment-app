import axios, { AxiosInstance } from "axios"

export const api: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.SERVER_URL,
})

export const SERVER_URL = process.env.SERVER_URL || ''

export const fetcher = (url: string) => fetch(`${SERVER_URL}${url}`).then(response => response.json())