import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const httpRequest = axios.create({
    baseURL: API_BASE_URL,
});

export const get = async (
    url: string,
    accessToken: string,
    config?: {
        headers?: object;
    }
) => {
    try {
        const response = await httpRequest.get(url, {
            ...config,
            headers: {
                ...config?.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const post = async (
    url: string,
    accessToken: string,
    data: object,
    config?: {
        headers?: object;
    }
) => {
    try {
        const response = await httpRequest.post(url, data, {
            ...config,
            headers: {
                ...config?.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const put = async (
    url: string,
    accessToken: string,
    data: object,
    config?: {
        headers?: object;
    }
) => {
    try {
        const response = await httpRequest.put(url, data, {
            ...config,
            headers: {
                ...config?.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
