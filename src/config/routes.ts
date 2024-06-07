type RoutesType = {
    [key: string]: string;
};

const routes: RoutesType = {
    home: "/",
    login: "/login",
    profile: "/profile/:id",
    search: "/search/:city",
    manageRestaurant: "/manage-restaurant",
    authCallBack: "auth-callback",
    detail: "/detail/:id",
};

export default routes;
