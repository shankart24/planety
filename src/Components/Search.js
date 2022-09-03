import { useDispatch, useSelector } from "react-redux";
import { handleSearch } from "../Store/features/filterSlice";

export default function Search({ fetchData }) {
    const filtersState = useSelector(state => state.filters);
    const dispatch = useDispatch();

    return (
        <div className="bg-pink-200">
            <input
                className="border border-gray-400 m-6"
                type="text"
                value={filtersState.searchText}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        fetchData();
                    }
                }}
                onChange={e => dispatch(handleSearch(e.target.value))}
            />
            <button className="bg-blue-900 text-white" onClick={fetchData}>
                Search
            </button>
        </div>
    );
}
