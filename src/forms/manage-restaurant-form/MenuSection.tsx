import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "menuItems",
    });

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Menu</h2>
                <FormDescription>Add the menu items that your restaurant serves</FormDescription>
            </div>
            <FormField
                control={control}
                name="menuItems"
                render={() => {
                    return (
                        <FormItem className="flex flex-col gap-2">
                            {fields.map((_, index) => {
                                return (
                                    <MenuItemInput
                                        key={index}
                                        index={index}
                                        removeMenuItem={() => {
                                            remove(index);
                                        }}
                                    />
                                );
                            })}
                        </FormItem>
                    );
                }}
            />
            <Button
                type="button"
                onClick={() => {
                    append({ name: "", price: 0 });
                }}
            >
                Add new menu item
            </Button>
        </div>
    );
};

export default MenuSection;