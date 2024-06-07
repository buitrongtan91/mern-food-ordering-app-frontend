import Hero from "@/components/Hero";
import landing from "@/assets/imgs/landing.png";
import appDownload from "@/assets/imgs/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        });
    };

    return (
        <>
            <Hero />
            <div className=" mx-auto flex flex-col gap-12 items-center">
                <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center mt-[-20px] md:w-4/5 w-4/5">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-800">Welcome to my world !!!</h1>
                    <span className="text-xl">Food is just a click way</span>
                    <SearchBar placeHolder="Search by city or town" onSubmit={handleSearchSubmit} />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                    <img src={landing} />
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <span className="font-bold text-3xl tracking-tight">Order takeaway even faster!</span>
                        <span>Download MyApp for faster ordering and personalized recommendations</span>
                        <img src={appDownload} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
