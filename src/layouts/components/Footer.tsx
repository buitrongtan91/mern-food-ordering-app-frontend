import { Link } from "react-router-dom";
import config from "@/config";

function Footer() {
    return (
        <div className="bg-orange-500 py-8">
            <div className="container flex items-center justify-between">
                <Link to={config.routes.home} className="text-2xl font-bold text-white">
                    MyApp
                </Link>
            </div>
        </div>
    );
}

export default Footer;
