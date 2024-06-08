export type User = {
    _id: string;
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
};

export type MenuItem = {
    _id: string;
    name: string;
    price: number;
};

export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: string;
};

export type RestaurantSearchResult = {
    data: Restaurant[];
    pagination: {
        totalRestaurants: number;
        page: number;
        pages: number;
    };
};

export type OrderStatus = "placed" | "paid" | "pending" | "completed" | "delivered" | "cancelled";

export type Order = {
    _id: string;
    restaurant: Restaurant;
    user: User;
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: number;
    }[];
    deliverDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
    };
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
    restaurantId: string;
};
