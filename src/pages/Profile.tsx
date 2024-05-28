import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { useUpdateUser, useGetCurrentUser } from "@/services/UserService";
import { Loader2 } from "lucide-react";

const Profile = () => {
    const { currentUser, isLoading: isGetLoading } = useGetCurrentUser();
    const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();

    if (isGetLoading) {
        return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
    }

    if (!currentUser) {
        return <span>Failed to load user</span>;
    }

    return <UserProfileForm onSave={updateUser} isLoading={isUpdateLoading} currentUser={currentUser} />;
};

export default Profile;
