import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status";

type Props = {
    order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt);
        created.setMinutes(created.getMinutes() + order.restaurant.estimatedDeliveryTime);

        const hours = created.getHours();
        const minutes = created.getMinutes();

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    };

    const getOrderInfo = () => {
        return ORDER_STATUS.find((status) => status.value === order.status) || ORDER_STATUS[0];
    };

    return (
        <>
            <h1 className="text-3xl font-bold flex flex-col gap-5 md:flex-row md:justify-between">
                <span>Order status: {order.status}</span>
                <span>Expected by: {getExpectedDelivery()}</span>
            </h1>
            <Progress value={getOrderInfo().progressValue} />
        </>
    );
};

export default OrderStatusHeader;
