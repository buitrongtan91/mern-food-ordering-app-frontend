import { useAuth0 } from "@auth0/auth0-react";
import { post, get, put, patch } from "../utils/httpRequest";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Order, Restaurant, RestaurantSearchResult } from "@/types";
import { SearchState } from "@/pages/SearchPage";

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
        const response = await get("/restaurant/get-restaurant", { accessToken: token });
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

export const useSearchRestaurants = (searchState: SearchState, city?: string) => {
    const searchRequest = async (): Promise<RestaurantSearchResult> => {
        const response = await get(`/restaurant/search/${city}`, {
            config: {
                params: {
                    searchQuery: searchState.searchQuery,
                    page: searchState.page,
                    selectedCuisines: searchState.selectedCuisines.join(","),
                    sortOption: searchState.sortOption,
                },
            },
        });
        return response;
    };

    const { data: restaurants, isLoading } = useQuery(["searchRestaurant", searchState], searchRequest, {
        enabled: !!city,
    });

    return { restaurants, isLoading };
};

export const useGetRestaurantById = (id?: string) => {
    const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
        const response = await get(`/restaurant/${id}`);
        return response;
    };

    const {
        data: restaurant,
        isLoading,
        error,
    } = useQuery(["getRestaurantById", id], getRestaurantByIdRequest, { enabled: !!id });

    if (error) {
        toast.error("Failed to fetch restaurant", { duration: 2000 });
    }

    return { restaurant, isLoading };
};

export const useGetRestaurantOrders = () => {
    const { getAccessTokenSilently } = useAuth0();
    const getOrdersRequest = async (): Promise<Order[]> => {
        const token = await getAccessTokenSilently();
        const response = await get("/restaurant/order", { accessToken: token });
        return response;
    };

    const { data: orders, isLoading, error } = useQuery("fetchOrders", getOrdersRequest);

    if (error) {
        toast.error("Failed to fetch orders", { duration: 2000 });
    }

    return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
    orderId: string;
    status: string;
};

export const useUpdateOrderStatus = () => {
    const { getAccessTokenSilently } = useAuth0();
    const updateOrderStatusRequest = async (data: UpdateOrderStatusRequest) => {
        const token = await getAccessTokenSilently();
        const response = await patch(`/restaurant/order/${data.orderId}/status`, data, {
            accessToken: token,
        });
        return response;
    };

    const { mutateAsync: updateOrderStatus, isLoading, isSuccess, error } = useMutation(updateOrderStatusRequest);

    if (isSuccess) {
        toast.success("Restaurant updated successfully", { duration: 2000 });
    }

    if (error) {
        toast.error("Failed to fetch orders", { duration: 2000 });
    }

    return { updateOrderStatus, isLoading };
};
