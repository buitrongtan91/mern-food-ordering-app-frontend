import { MenuItem as MenuItemType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
    menuitem: MenuItemType;
    addToCart: () => void;
};

const MenuItem = ({ menuitem, addToCart }: Props) => {
    return (
        <Card className="cursor-pointer" onClick={addToCart}>
            <CardHeader>
                <CardTitle>{menuitem.name}</CardTitle>
            </CardHeader>
            <CardContent className="font-bold">${menuitem.price}</CardContent>
        </Card>
    );
};

export default MenuItem;
