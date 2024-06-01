type RoutesType = {
    [key: string]: string;
};

const routes: RoutesType = {
    home: "/",
    login: "/login",
    profile: "/profile/:id",
    manageRestaurant: "/manage-restaurant",
    authCallBack: "auth-callback",
};

export default routes;
