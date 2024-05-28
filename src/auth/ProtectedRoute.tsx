import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
};
const ProtectedRoute = ({ children }: Props) => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <React.Fragment>{children}</React.Fragment> : <Navigate to="/" />;
};

export default ProtectedRoute;
