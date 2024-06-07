import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useSearchRestaurants } from "@/services/RestaurantService";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;
};

const SearchPage = () => {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch",
    });
    const { restaurants } = useSearchRestaurants(searchState, city);
    const [isExpanded, setIsExpanded] = useState(false);

    if (!restaurants?.data || !city) {
        return <span>No results found</span>;
    }

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => {
            return {
                ...prevState,
                searchQuery: searchFormData.searchQuery,
            };
        });
    };

    const resetSearch = () => {
        setSearchState((prevState) => {
            return {
                ...prevState,
                searchQuery: "",
            };
        });
    };

    const setPage = (page: number) => {
        setSearchState((prevState) => {
            return {
                ...prevState,
                page,
            };
        });
    };

    const setSelectedCuisines = (cuisines: string[]) => {
        setSearchState((prevState) => {
            return {
                ...prevState,
                selectedCuisines: cuisines,
                page: 1,
            };
        });
    };

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => {
            return {
                ...prevState,
                sortOption,
                page: 1,
            };
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter
                    onChange={setSelectedCuisines}
                    selectedCuisines={searchState.selectedCuisines}
                    isExpanded={isExpanded}
                    onExpandClick={() =>
                        setIsExpanded((prevState) => {
                            return !prevState;
                        })
                    }
                />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeHolder="Search by Cuisine or restaurant name"
                    onReset={resetSearch}
                />
                <div className="text-xl font-bold flex flex-1 flex-col  gap-5 justify-between lg:flex-row">
                    <SearchResultInfo total={restaurants.pagination.totalRestaurants} city={city} />
                    <SortOptionDropdown onChange={setSortOption} sortOption={searchState.sortOption} />
                </div>

                {restaurants.data.map((restaurant) => {
                    return <SearchResultCard key={restaurant._id} restaurant={restaurant} />;
                })}
                <PaginationSelector
                    page={restaurants.pagination.page}
                    pages={restaurants.pagination.pages}
                    onChangePage={setPage}
                />
            </div>
        </div>
    );
};

export default SearchPage;
