import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useCreateRestaurant, useGetRestaurant, useUpdateRestaurant } from "@/services/RestaurantService";

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateRestaurantLoading } = useCreateRestaurant();
    const { restaurant } = useGetRestaurant();
    const { updateRestaurant, isLoading: isUpdateRestaurantLoading } = useUpdateRestaurant();

    const isEditing = !!restaurant;

    return (
        <ManageRestaurantForm
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateRestaurantLoading || isUpdateRestaurantLoading}
            restaurant={restaurant}
        />
    );
};

export default ManageRestaurantPage;
