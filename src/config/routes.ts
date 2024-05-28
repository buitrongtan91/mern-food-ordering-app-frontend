type RoutesType = {
    [key: string]: string;
};

const routes: RoutesType = {
    home: "/",
    login: "/login",
    profile: "/profile/:id",
    authCallBack: "auth-callback",
};

export default routes;
