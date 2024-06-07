import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { useGetCurrentUser } from "@/services/UserService";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import LoadingButton from "./LoadingButton";

type Props = {
    onCheckout: (UserFormData: UserFormData) => void;
    disabled: boolean;
    isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const { pathname } = useLocation();
    const { currentUser, isLoading: isGetUserLoading } = useGetCurrentUser();

    console.log(pathname);
    const onLogin = async () => {
        await loginWithRedirect({
            appState: { returnTo: pathname },
        });
    };

    if (!isAuthenticated) {
        return (
            <Button onClick={onLogin} className="bg-orange-500 w-full">
                Login to checkout
            </Button>
        );
    }

    if (isGetUserLoading || !currentUser) {
        return <LoadingButton />;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {isLoading ? (
                    <LoadingButton></LoadingButton>
                ) : (
                    <Button disabled={disabled} className="bg-orange-500 w-full">
                        Go to checkout
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
                <UserProfileForm
                    currentUser={currentUser}
                    onSave={onCheckout}
                    isLoading={isGetUserLoading}
                    title="Confirm delivery details"
                    buttonText="Continue to checkout"
                />
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutButton;
