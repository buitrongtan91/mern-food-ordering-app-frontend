import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import {
    useCreateRestaurant,
    useGetRestaurant,
    useGetRestaurantOrders,
    useUpdateRestaurant,
} from "@/services/RestaurantService";

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateRestaurantLoading } = useCreateRestaurant();
    const { restaurant } = useGetRestaurant();
    const { updateRestaurant, isLoading: isUpdateRestaurantLoading } = useUpdateRestaurant();
    const { orders, isLoading: isOrdersLoading } = useGetRestaurantOrders();
    const isEditing = !!restaurant;

    return (
        <Tabs defaultValue="orders">
            <TabsList>
                <TabsTrigger value="orders" asChild>
                    <span> Orders</span>
                </TabsTrigger>
                <TabsTrigger value="manage-restaurant" asChild>
                    <span> Manage restaurant</span>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="space-y-5 bg-gray-50 py-10 rounded-lg p-10">
                {isOrdersLoading ? (
                    <div>...Loading</div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
                        {orders?.map((order, index) => {
                            return <OrderItemCard key={index} order={order} />;
                        })}
                    </>
                )}
            </TabsContent>
            <TabsContent value="manage-restaurant">
                <ManageRestaurantForm
                    onSave={isEditing ? updateRestaurant : createRestaurant}
                    isLoading={isCreateRestaurantLoading || isUpdateRestaurantLoading}
                    restaurant={restaurant}
                />
            </TabsContent>
        </Tabs>
    );
};

export default ManageRestaurantPage;
