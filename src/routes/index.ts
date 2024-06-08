import {
    Home,
    Profile,
    AuthCallBackPage,
    ManageRestaurantPage,
    SearchPage,
    DetailPage,
    OrderStatusPage,
} from "@/pages";
import { DefaultLayout } from "@/layouts";
import config from "@/config";
import React, { ReactNode } from "react";

type RouteType = {
    path: string;
    component: React.FunctionComponent;
    layout: React.FunctionComponent<{ children: ReactNode }>;
};

const publicRoutes: RouteType[] = [
    {
        path: config.routes.home,
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: config.routes.search,
        component: SearchPage,
        layout: DefaultLayout,
    },

    {
        path: config.routes.detail,
        component: DetailPage,
        layout: DefaultLayout,
    },
];

const privateRoutes: RouteType[] = [
    {
        path: config.routes.profile,
        component: Profile,
        layout: DefaultLayout,
    },
    {
        path: config.routes.authCallBack,
        component: AuthCallBackPage,
        layout: React.Fragment,
    },
    {
        path: config.routes.manageRestaurant,
        component: ManageRestaurantPage,
        layout: DefaultLayout,
    },
    {
        path: config.routes.orderStatus,
        component: OrderStatusPage,
        layout: DefaultLayout,
    },
];

export { publicRoutes, privateRoutes };
