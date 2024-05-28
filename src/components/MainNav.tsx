import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UserMenu from "./UserMenu";

function MainNav() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        <div className="flex space-x-2 items-center">
            {isAuthenticated ? (
                <UserMenu />
            ) : (
                <Button
                    variant="ghost"
                    className="text-xl font-bold hover:text-orange-500 hover:bg-white"
                    onClick={async () => {
                        await loginWithRedirect();
                    }}
                >
                    Log in
                </Button>
            )}
        </div>
    );
}

export default MainNav;
