import CheckoutButton from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/services/OrderSercive";
import { useGetRestaurantById } from "@/services/RestaurantService";
import { MenuItem as MenuItemType } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItemType = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

const DetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { restaurant, isLoading } = useGetRestaurantById(id);
    const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${id}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });
    const { createCheckoutSession, isLoading: isCreateCheckoutLoading } = useCreateCheckoutSession();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!restaurant) {
        return <div>Restaurant not found</div>;
    }

    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find((item) => item._id === menuItem._id);
            let updatedCartItems;

            if (existingCartItem) {
                updatedCartItems = prevCartItems.map((item) => {
                    return menuItem._id === item._id ? { ...item, quantity: item.quantity + 1 } : item;
                });
            } else {
                updatedCartItems = [...prevCartItems, { ...menuItem, quantity: 1 }];
            }

            sessionStorage.setItem(`cartItems-${id}`, JSON.stringify(updatedCartItems));

            return updatedCartItems;
        });
    };

    const removeCartItem = (cartItem: CartItemType) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter((item) => item._id !== cartItem._id);
            return updatedCartItems;
        });
    };

    const onCheckout = async (userFormData: UserFormData) => {
        if (!restaurant) {
            return;
        }

        console.log(userFormData);
        const checkoutData = {
            cartItems: cartItems.map((item) => {
                return {
                    menuItemId: item._id,
                    name: item.name,
                    quantity: item.quantity,
                };
            }),
            restaurantId: restaurant._id,
            deliveryDetails: userFormData,
        };

        const data = await createCheckoutSession(checkoutData);

        window.location.href = data.url;
    };

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 6}>
                <img src={restaurant.imageUrl} className="rounded-md w-full h-full object-cover" />
            </AspectRatio>

            <div className="grid md:grid-cols-[2fr_1fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    {restaurant.menuItems.map((menuItem) => {
                        return (
                            <MenuItem
                                key={menuItem._id}
                                menuitem={menuItem}
                                addToCart={() => {
                                    addToCart(menuItem);
                                }}
                            />
                        );
                    })}
                </div>

                <div>
                    <Card>
                        <OrderSummary cartItems={cartItems} restaurant={restaurant} removeFromCart={removeCartItem} />
                        <CardFooter>
                            <CheckoutButton
                                disabled={cartItems.length === 0}
                                onCheckout={onCheckout}
                                isLoading={isCreateCheckoutLoading}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
