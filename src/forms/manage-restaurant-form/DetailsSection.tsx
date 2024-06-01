import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
    const { control } = useFormContext();
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Details</h2>
                <FormDescription>Enter the details about your restaurant</FormDescription>
            </div>
            <FormField
                control={control}
                name="restaurantName"
                render={({ field }) => {
                    return (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    );
                }}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name="city"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={control}
                    name="country"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
            </div>
            <FormField
                control={control}
                name="deliveryPrice"
                render={({ field }) => {
                    return (
                        <FormItem className="max-w-[30%]">
                            <FormLabel>Delivery Price</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    );
                }}
            />{" "}
            <FormField
                control={control}
                name="estimatedDeliveryTime"
                render={({ field }) => {
                    return (
                        <FormItem className="max-w-[30%]">
                            <FormLabel>Estimated Delivery Time</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    );
                }}
            />
        </div>
    );
};

export default DetailsSection;
