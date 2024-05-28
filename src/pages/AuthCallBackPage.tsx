import { useAuth0 } from "@auth0/auth0-react";
import { useCreateNewUser } from "@/services/UserService";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallBackPage = () => {
    const { user } = useAuth0();
    const { createNewUser } = useCreateNewUser();
    const hasCreatedUser = useRef(false);
    const navigate = useNavigate();
    console.log("da render tai day");

    useEffect(() => {
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            createNewUser({
                auth0Id: user.sub,
                email: user.email,
            });
            hasCreatedUser.current = true;
        }
        navigate("/");
    }, [user]);

    return <div>Loading...</div>;
};

export default AuthCallBackPage;
