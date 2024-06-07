import { AppState, Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
};

export default function Auth0ProviderWithNavigate({ children }: Props) {
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
    const navigate = useNavigate();

    const onRedirectCallback = (appState?: AppState) => {
        navigate(appState?.returnTo || "/auth-callback");
    };

    if (!domain || !clientId || !redirectUri) {
        throw new Error("Auth0 environment variables are not set.");
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                audience: audience,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
}
