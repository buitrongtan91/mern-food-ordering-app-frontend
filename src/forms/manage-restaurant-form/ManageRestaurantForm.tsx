import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import DetailsSection from "./DetailsSection";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z
    .object({
        restaurantName: z.string().min(3, "Restaurant Name is required"),
        city: z.string().min(3, "City is required"),
        country: z.string().min(3, "Country is required"),
        deliveryPrice: z.coerce.number({
            required_error: "Delivery Price is required",
            invalid_type_error: "Delivery Price must be a number",
        }),
        estimatedDeliveryTime: z.coerce.number({
            required_error: "Estimated Delivery Time is required",
            invalid_type_error: "Estimated Delivery Time must be a number",
        }),
        cuisines: z.array(z.string()).nonempty("Cuisines is required"),
        menuItems: z.array(
            z.object({
                name: z.string().min(1, "name is required"),
                price: z.coerce.number().min(1, "price is required"),
            })
        ),
        imageUrl: z.string().optional(),
        imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
    })
    .refine((data) => data.imageUrl || data.imageFile, {
        message: "Image is required",
        path: ["imageFile"],
    });

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (data: FormData) => void;
    isLoading: boolean;
    restaurant?: Restaurant;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            restaurantName: "",
            city: "",
            country: "",
            deliveryPrice: 0,
            estimatedDeliveryTime: 0,
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
        },
    });

    useEffect(() => {
        if (!restaurant) {
            return;
        }

        form.reset(restaurant);
    }, [form, restaurant]);

    const onSubmit = (formDataJson: restaurantFormData) => {
        const formData = new FormData();
        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());
        formDataJson.cuisines.forEach((cuisine, index) => formData.append(`cuisines[${index}]`, cuisine));
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
        });
        if (formDataJson.imageFile) {
            formData.append("imageFile", formDataJson.imageFile);
        }
        if (formDataJson.imageUrl) {
            formData.append("imageUrl", formDataJson.imageUrl);
        }
        onSave(formData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
                <DetailsSection />
                <CuisinesSection />
                <MenuSection />
                <ImageSection />
                {isLoading ? <LoadingButton /> : <Button type="submit">Save</Button>}
            </form>
        </Form>
    );
};

export default ManageRestaurantForm;
