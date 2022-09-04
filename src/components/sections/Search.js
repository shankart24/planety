import { useDispatch, useSelector } from "react-redux";
import { handleSearch } from "../../store/features/filterSlice";

export default function Search({ fetchData }) {
    const filtersState = useSelector(state => state.filters);
    const dispatch = useDispatch();

    return (
        <div className="pt-10 pb-3 ">
            <h3 className="font-semibold text-xl tracking-tight mb-4 text-blue-900">
                Find your favourite planet
            </h3>
            <form className="flex flex-col items-center  mb-4 sm:flex-row ">
                <input
                    type="text"
                    value={filtersState.searchText}
                    placeholder="Eg : Earth , Mercury "
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            fetchData();
                        }
                    }}
                    onChange={e => dispatch(handleSearch(e.target.value))}
                    className="flex-grow w-full h-12 px-4 mb-3 text-sm bg-white rounded border border-gray-300 appearance-none sm:mr-2 sm:mb-0  focus:outline-none focus:shadow-outline"
                />
                <button
                    onClick={e => {
                        e.preventDefault();
                        fetchData();
                    }}
                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium  text-white rounded shadow-md sm:w-1/3 bg-blue-900 focus:shadow-outline focus:outline-none"
                >
                    <p>Search</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 ml-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
}
