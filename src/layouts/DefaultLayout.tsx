import Header from "@/layouts/components/Header";
import React from "react";
import Footer from "./components/Footer";

type Props = {
    children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="container mx-auto flex-1 py-10">{children}</div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
