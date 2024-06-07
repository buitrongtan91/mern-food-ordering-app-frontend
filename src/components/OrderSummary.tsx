import { CartItemType } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
    cartItems: CartItemType[];
    restaurant: Restaurant;
    removeFromCart: (cartItem: CartItemType) => void;
};

const OrderSummary = ({ cartItems, restaurant, removeFromCart }: Props) => {
    const getTotalCost = () => {
        const totalInPence = cartItems.reduce((total, cardItem) => {
            return total + cardItem.price * cardItem.quantity;
        }, 0);

        return totalInPence + restaurant.deliveryPrice;
    };

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex justify-between">
                    <span>Your order</span>
                    <span>${getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((cartItem, index) => {
                    return (
                        <div key={index} className="flex justify-between">
                            <span>
                                <Badge variant="outline" className="mr-2">
                                    {cartItem.quantity}
                                </Badge>
                                {cartItem.name}
                            </span>
                            <span className="flex items-center gap-1">
                                ${cartItem.price * cartItem.quantity}
                                <Trash
                                    className="text-red-600"
                                    onClick={() => {
                                        removeFromCart(cartItem);
                                    }}
                                />
                            </span>
                        </div>
                    );
                })}

                <Separator />

                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>${restaurant.deliveryPrice}</span>
                </div>
            </CardContent>
        </>
    );
};

export default OrderSummary;
