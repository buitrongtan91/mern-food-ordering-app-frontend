import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
    order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
    return (
        <div className="space-y-5 ">
            <div className="flex flex-col">
                <span className="font-bold">Delivering to: </span>
                <span>{order.deliverDetails.name}</span>
                <span>
                    {order.deliverDetails.addressLine1}, {order.deliverDetails.city}
                </span>
                <Separator className="my-4" />
                <div className="flex flex-col">
                    <span className="font-bold">Your order</span>
                    {order.cartItems.map((item, index) => {
                        return (
                            <div key={index} className="flex gap-3">
                                <span>{item.name}</span>
                                <span>x{item.quantity}</span>
                            </div>
                        );
                    })}
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col">
                    <span className="font-bold">Total</span>
                    <span>${order.totalAmount}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderStatusDetail;
