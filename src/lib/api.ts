import axios from "axios";

export const api = axios.create({
    baseURL: 'https://server-slots.vercel.app/'
})