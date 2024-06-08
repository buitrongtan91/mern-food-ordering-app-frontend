import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useGetMyOrders } from "@/services/OrderSercive";

const OrderStatusPage = () => {
    const { MyOrders, isLoading } = useGetMyOrders();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!MyOrders || MyOrders.length === 0) {
        return <div>No orders found</div>;
    }

    return (
        <div className="space-y-10 ">
            {MyOrders.map((order, index) => {
                return (
                    <div key={index} className="space-y-10 bg-gray-50 p-10 rounded-lg ">
                        <OrderStatusHeader order={order} />
                        <div className="grid gap-10 md:grid-cols-2">
                            <OrderStatusDetail order={order} />
                            <AspectRatio ratio={16 / 6}>
                                <img
                                    src={order.restaurant.imageUrl}
                                    className="rounded-md object-cover w-full h-full"
                                />
                            </AspectRatio>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OrderStatusPage;
