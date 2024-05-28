import { LogOut, User } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { log } from "console";

type Props = {
    onClick: () => void;
};

function MobileNavLinks({ onClick }: Props) {
    const { user, logout } = useAuth0();
    return (
        <span className="w-full ">
            <Link
                to={`/profile/${user?.nickname}`}
                className="w-full flex items-center py-2 px-2 rounded-sm hover:bg-neutral-100 text-sm font-medium "
                onClick={onClick}
            >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
            </Link>
            <Separator className="my-3" />
            <Button
                variant={"ghost"}
                className="py-2 px-2"
                onClick={() => {
                    logout();
                }}
            >
                <LogOut className="mr-2 h-4 w-4 " />
                Log out
            </Button>
        </span>
    );
}

export default MobileNavLinks;
