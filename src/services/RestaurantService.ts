import { useAuth0 } from "@auth0/auth0-react";
import { post, get, put } from "../utils/httpRequest";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

export const useCreateRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    const createRestaurantRequest = async (data: FormData) => {
        const token = await getAccessTokenSilently();
        const response = await post("/restaurant/create-restaurant", token, data);
        return response;
    };

    const { mutate: createRestaurant, isLoading, isSuccess, error } = useMutation(createRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant created successfully", { duration: 2000 });
    }

    if (error) {
        toast.error("Failed to create restaurant", { duration: 2000 });
    }

    return { createRestaurant, isLoading };
};

export const useGetRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    const getRestaurantRequest = async () => {
        const token = await getAccessTokenSilently();
        const response = await get("/restaurant/get-restaurant", token);
        return response;
    };

    const { data: restaurant, isLoading, error } = useQuery("fetchRestaurant", getRestaurantRequest);

    if (error) {
        toast.error("Failed to fetch restaurant", { duration: 2000 });
    }

    return { restaurant, isLoading };
};

export const useUpdateRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    const updateRestaurantRequest = async (data: FormData) => {
        const token = await getAccessTokenSilently();
        const response = await put("/restaurant/update-restaurant", token, data);
        return response;
    };

    const { mutate: updateRestaurant, isLoading, isSuccess, error } = useMutation(updateRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant updated successfully", { duration: 2000 });
    }
    if (error) {
        toast.error("Failed to update restaurant", { duration: 2000 });
    }

    return { updateRestaurant, isLoading };
};
