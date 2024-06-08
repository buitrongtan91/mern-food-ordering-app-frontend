import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const httpRequest = axios.create({
    baseURL: API_BASE_URL,
});

export const get = async (
    url: string,
    options?: {
        accessToken?: string;
        config?: {
            headers?: object;
            params?: object;
        };
    }
) => {
    try {
        const response = await httpRequest.get(url, {
            params: options?.config?.params,
            headers: {
                ...options?.config?.headers,
                Authorization: `Bearer ${options?.accessToken}`,
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
        params?: object;
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

export const patch = async (
    url: string,
    data: object,
    options?: {
        accessToken?: string;
        config?: {
            headers?: object;
            params?: object;
        };
    }
) => {
    try {
        const response = await httpRequest.patch(url, data, {
            params: options?.config?.params,
            headers: {
                ...options?.config?.headers,
                Authorization: `Bearer ${options?.accessToken}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
