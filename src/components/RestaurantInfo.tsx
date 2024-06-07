import { Restaurant } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
    restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{restaurant.restaurantName}</CardTitle>
                <CardDescription>
                    {restaurant.city}, {restaurant.country}
                </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
        </Card>
    );
};

export default RestaurantInfo;
