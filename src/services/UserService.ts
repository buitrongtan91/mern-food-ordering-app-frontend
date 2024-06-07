import { useMutation, useQuery } from "react-query";
import { post, put, get } from "../utils/httpRequest";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { User } from "@/types";

export const useCreateNewUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createNewUserRequest = async (data: object) => {
        const token = await getAccessTokenSilently();

        await post("/user/create-new-user", token, data);
    };

    const { mutateAsync: createNewUser, isLoading, isError, isSuccess } = useMutation(createNewUserRequest);

    return { createNewUser, isLoading, isError, isSuccess };
};

type UpdateUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
};

export const useUpdateUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateUserRequest = async (data: UpdateUserRequest) => {
        const token = await getAccessTokenSilently();

        await put("/user/update-user", token, data);
    };

    const { mutateAsync: updateUser, isLoading, isError, isSuccess, error, reset } = useMutation(updateUserRequest);

    if (isSuccess) {
        toast.success("User updated successfully", { duration: 2000 });
    }

    if (error) {
        toast.error("Failed to update user", { duration: 2000 });
        reset();
    }

    return { updateUser, isLoading, isError, isSuccess, error, reset };
};

export const useGetCurrentUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getCurrentUserRequest = async (): Promise<User> => {
        const token = await getAccessTokenSilently();

        const response = await get("/user/get-current-user", { accessToken: token });

        return response;
    };

    const { data: currentUser, isLoading, error } = useQuery("currentUser", getCurrentUserRequest);

    if (error) {
        toast.error(error.toString(), { duration: 2000 });
    }

    return { currentUser, isLoading };
};
