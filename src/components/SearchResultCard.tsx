import { Restaurant } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
    restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
    return (
        <Link
            to={`/detail/${restaurant._id}`}
            className="grid lg:grid-cols-[2fr_3fr] gap-5 group hover:bg-gray-100 rounded-md p-5"
        >
            <AspectRatio ratio={16 / 4}>
                <img src={restaurant.imageUrl} className="rounded-md w-full h-full object-cover" />
            </AspectRatio>
            <div id="card-content" className="flex flex-col gap-6">
                <span className="text-lg font-bold group-hover:underline">{restaurant.restaurantName}</span>
                <div className="grid md:grid-cols-2 gap-2">
                    <div className="flex flex-row flex-wrap">
                        {restaurant.cuisines.map((cuisine, index) => {
                            return (
                                <span key={index} className="flex">
                                    {cuisine}
                                    {index < restaurant.cuisines.length - 1 && <Dot />}
                                </span>
                            );
                        })}
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-center gap-2">
                            <Clock className="text-green-600" />
                            {restaurant.estimatedDeliveryTime} mins
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Banknote className="text-green-600" />
                            Delivery from ${restaurant.deliveryPrice}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SearchResultCard;
