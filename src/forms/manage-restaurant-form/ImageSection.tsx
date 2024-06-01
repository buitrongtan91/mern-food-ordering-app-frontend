import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
    const { control, watch } = useFormContext();
    const existingImage = watch("imageUrl");
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Image</h2>
                <FormDescription>
                    Add an image that will be displayed on your restaurant listening in the search result. Adding a new
                    image will overwrite the existing one.
                </FormDescription>
            </div>
            <div className="flex flex-col gap-8 w-1/2">
                {existingImage && (
                    <AspectRatio ratio={16 / 9}>
                        <img src={existingImage} alt="restaurant" className="object-cover w-full h-full" />
                    </AspectRatio>
                )}

                <FormField
                    control={control}
                    name="imageFile"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={(event) => {
                                            field.onChange(event.target.files ? event.target.files[0] : null);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
            </div>
        </div>
    );
};

export default ImageSection;
