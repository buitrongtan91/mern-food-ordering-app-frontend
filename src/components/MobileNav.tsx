import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileNavLinks from "./MobileNavLinks";
import { useState } from "react";
import { Button } from "./ui/button";

const MobileNav = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Sheet
            open={isOpen}
            onOpenChange={() => {
                setIsOpen(!isOpen);
            }}
        >
            <SheetTrigger>
                <Menu className="text-orange-500" />
            </SheetTrigger>
            <SheetContent className="w-2/3">
                <SheetTitle>
                    {isAuthenticated ? (
                        <div className="flex  items-center">
                            <Avatar>
                                <AvatarImage src={user?.picture} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="ml-4">{user?.name}</span>
                        </div>
                    ) : (
                        <span>Hello my friend !!!</span>
                    )}
                </SheetTitle>
                <Separator className="my-4" />

                {isAuthenticated ? (
                    <MobileNavLinks
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    />
                ) : (
                    <Button
                        onClick={async () => {
                            await loginWithRedirect();
                        }}
                    >
                        Log in
                    </Button>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
