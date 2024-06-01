import { FormDescription, FormField } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import config from "@/config";
import CuisineCheckbox from "./CuisineCheckbox";

const CuisinesSection = () => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Cuisines</h2>
                <FormDescription>Select the cuisines that your restaurant serves</FormDescription>
            </div>
            <FormField
                control={control}
                name="cuisines"
                render={({ field }) => {
                    return (
                        <div className="grid md:grid-cols-5 gap-1">
                            {config.restaurant.cuisineList.map((cuisine, index) => {
                                return <CuisineCheckbox key={index} cuisine={cuisine} field={field} />;
                            })}
                        </div>
                    );
                }}
            />
        </div>
    );
};

export default CuisinesSection;
