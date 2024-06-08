import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status";

import { useUpdateOrderStatus } from "@/services/RestaurantService";
import { useEffect, useState } from "react";

type Props = {
    order: Order;
};

const OrderItemCard = ({ order }: Props) => {
    const { updateOrderStatus, isLoading } = useUpdateOrderStatus();
    const [status, setStatus] = useState<OrderStatus>(order.status);

    useEffect(() => {
        setStatus(order.status);
    }, [order.status]);

    const handleStatusChange = async (status: OrderStatus) => {
        await updateOrderStatus({ orderId: order._id, status: status });
        setStatus(status);
    };

    const getTime = () => {
        const orderDateTime = new Date(order.createdAt);

        const hours = orderDateTime.getHours();
        const minutes = orderDateTime.getMinutes();

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
                    <div>
                        Customer name:
                        <span className="ml-2 font-normal">{order.deliverDetails.name}</span>
                    </div>
                    <div>
                        Delivery address:
                        <span className="ml-2 font-normal">
                            {order.deliverDetails.addressLine1}, {order.deliverDetails.city}
                        </span>
                    </div>
                    <div>
                        Time:
                        <span className="ml-2 font-normal">{getTime()}</span>
                    </div>
                    <div>
                        Total cost:
                        <span className="ml-2 font-normal">${order.totalAmount}</span>
                    </div>
                </CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                    {order.cartItems.map((item, index) => {
                        return (
                            <span key={index}>
                                <Badge variant={"outline"} className="mr-2">
                                    {item.quantity}
                                </Badge>
                                {item.name}
                            </span>
                        );
                    })}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`${order._id}`}>What is the status of the order?</Label>
                    <Select
                        value={status}
                        disabled={isLoading}
                        onValueChange={(value) => {
                            handleStatusChange(value as OrderStatus);
                        }}
                    >
                        <SelectTrigger id={`${order._id}`}>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {ORDER_STATUS.map((status, index) => {
                                return (
                                    <SelectItem key={index} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderItemCard;
