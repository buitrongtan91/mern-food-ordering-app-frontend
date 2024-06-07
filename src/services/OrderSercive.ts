import { post } from "@/utils/httpRequest";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: number;
    }[];
    deliveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
    };
    restaurantId: string;
};

export const useCreateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0();
    const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {
        const token = await getAccessTokenSilently();
        const response = await post("/order/checkout/create-checkout-session", token, checkoutSessionRequest);
        return response;
    };

    const { mutateAsync: createCheckoutSession, isLoading, error, reset } = useMutation(createCheckoutSessionRequest);

    if (error) {
        toast.error("Failed to fetch restaurant", { duration: 2000 });
        reset();
    }

    return { createCheckoutSession, isLoading };
};
