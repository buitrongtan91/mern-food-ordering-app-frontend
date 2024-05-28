import { Link } from "react-router-dom";
import config from "@/config";
import MobileNav from "@/components/MobileNav";
import MainNav from "@/components/MainNav";

const Header = () => {
    return (
        <div className="sticky top-0 z-40 w-full border-b-2 border-b-orange-500 py-4 bg-white">
            <div className="container mx-auto flex justify-between items-center h-11">
                <Link to={config.routes.home} className="text-2xl font-bold text-orange-500">
                    MyApp
                </Link>
                <div className="md:hidden">
                    <MobileNav />
                </div>
                <div className="hidden md:block">
                    <MainNav />
                </div>
            </div>
        </div>
    );
};

export default Header;
