import config from "@/config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
    onChange: (cuisines: string[]) => void;
    selectedCuisines: string[];
    isExpanded: boolean;
    onExpandClick: () => void;
};
const CuisineFilter = ({ onChange, selectedCuisines, isExpanded, onExpandClick }: Props) => {
    const handleCuisinesReset = () => {
        onChange([]);
    };
    const handleCuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
        const cuisine = event.target.value;
        const isChecked = event.target.checked;
        const newCuisinesList = isChecked
            ? [...selectedCuisines, cuisine]
            : selectedCuisines.filter((c) => c !== cuisine);
        onChange(newCuisinesList);
    };
    return (
        <>
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-semibold mb-2">Filter by Cuisine</div>
                <div
                    onClick={handleCuisinesReset}
                    className="text-md font-semibold mb-2 underline cursor-pointer text-blue-500"
                >
                    Reset filters
                </div>
            </div>

            <div className="space-y-2 flex flex-col ">
                {config.restaurant.cuisineList
                    .slice(0, isExpanded ? config.restaurant.cuisineList.length : 7)
                    .map((cuisine, index) => {
                        const isSelected = selectedCuisines.includes(cuisine);
                        return (
                            <div key={index} className="flex">
                                <input
                                    id={`cuisine_${cuisine}`}
                                    type="checkbox"
                                    checked={isSelected}
                                    className="hidden"
                                    value={cuisine}
                                    onChange={handleCuisineChange}
                                />
                                <Label
                                    htmlFor={`cuisine_${cuisine}`}
                                    className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                                        isSelected
                                            ? "border border-green-500 text-green-600"
                                            : "border border-slate-300"
                                    }`}
                                >
                                    {isSelected && <Check size={20} strokeWidth={3} className="text-green-500" />}
                                    {cuisine}
                                </Label>
                            </div>
                        );
                    })}
                <Button onClick={onExpandClick} variant="link" className="mt-4 flex items-center">
                    {isExpanded ? (
                        <>
                            Show less
                            <ChevronUp />
                        </>
                    ) : (
                        <>
                            Show more
                            <ChevronDown />
                        </>
                    )}
                </Button>
            </div>
        </>
    );
};

export default CuisineFilter;
