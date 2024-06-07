import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

type Props = {
    onChange: (value: string) => void;
    sortOption: string;
};

const SORT_OPTIONS = [
    { label: "Best Match", value: "bestMatch" },
    { label: "Delivery Price", value: "deliveryPrice" },
    { label: "Estimated delivery time", value: "estimatedDeliveryTime" },
];

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort by : {sortOption}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {SORT_OPTIONS.map((option, index) => {
                    return (
                        <DropdownMenuItem
                            key={index}
                            className="cursor-pointer"
                            onClick={() => {
                                onChange(option.value);
                            }}
                        >
                            {option.label}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SortOptionDropdown;
