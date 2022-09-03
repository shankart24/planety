import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";
import { addData } from "./Store/features/dataSlice";
import {
    generateOptions,
    handleOptions,
    handleSearch,
    handleOptionsOnMount
} from "./Store/features/filterSlice";

export default function App() {
    const [state, setState] = useState({
        selectedColors: [],
        selectedShapes: [],
        selectedSizes: [],
        initialDataFetch: false
    });

    const filtersState = useSelector(state => state.filters);
    const planetsState = useSelector(state => state.data);
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    async function fetchData() {
        const finalUrl = generateUrl();
        const paramStr = finalUrl.split("?")[1];
        setSearchParams(paramStr);
        const res = await fetch(finalUrl);
        const data = await res.json();
        dispatch(addData(data));
    }

    async function fetchDataOnMount() {
        const res = await fetch(
            `http://localhost:3000/planets/${location.search}`
        );
        console.log(location.search, "location.search");
        const data = await res.json();
        console.log(data, "data from fetchDataOnMount");
        dispatch(addData(data));
        setState(state => ({
            ...state,
            initialDataFetch: true
        }));
    }

    function generateUrl() {
        let url = `http://localhost:3000/planets?q=${filtersState.searchText}`;
        const { selectedColors, selectedShapes, selectedSizes } = filtersState;
        selectedColors?.forEach(color => (url += `&color=${color}`));
        selectedShapes?.forEach(shape => (url += `&shape=${shape}`));
        selectedSizes?.forEach(size => (url += `&size=${size}`));
        return url;
    }

    async function fetchAllOptions(type) {
        const url = `http://localhost:3000/${type}s`;
        const res = await fetch(url);
        const data = await res.json();
        return { name: type, data };
    }

    useEffect(() => {
        const allOptionsPromises = ["color", "shape", "size"]?.map(type =>
            fetchAllOptions(type)
        );
        Promise.all(allOptionsPromises)
            ?.then(result => dispatch(generateOptions(result)))
            .then(() => {
                const params = {};
                for (let [key, value] of searchParams.entries()) {
                    params[key] =
                        params[key] && params[key]?.length !== 0
                            ? [...params[key], value]
                            : [value];
                }
                const res = Object.keys(params)?.map(key => {
                    return { name: key, data: params[key] };
                });
                setState(state => ({
                    ...state,
                    searchText: params["q"] ?? "",
                    selectedColors: params["color"] ?? [],
                    selectedShapes: params["shape"] ?? [],
                    selectedSizes: params["size"] ?? []
                }));
                dispatch(handleOptionsOnMount(res));
            })
            .then(() => {
                fetchDataOnMount();
            });
    }, []);

    useEffect(() => {
        if (state.initialDataFetch) {
            fetchData();
        }
    }, [
        filtersState.selectedColors,
        filtersState.selectedShapes,
        filtersState.selectedSizes
    ]);

    const handleChange = (e, type) => {
        const val = e.target.value;
        setState(state => ({
            ...state,
            [type]: !state[type]?.includes(val)
                ? [...state[type], val]
                : state[type]?.filter(item => item !== val)
        }));
        dispatch(handleOptions({ name: type, data: val }));
    };

    const optionSections = [
        {
            label: "Shape",
            data: filtersState.shapeOptions,
            type: "selectedShapes"
        },
        {
            label: "Color",
            data: filtersState.colorOptions,
            type: "selectedColors"
        },
        {
            label: "Size",
            data: filtersState.sizeOptions,
            type: "selectedSizes"
        }
    ];

    return (
        <section>
            <input
                className="border border-gray-400 m-6"
                type="text"
                value={filtersState.searchText}
                onChange={e => dispatch(handleSearch(e.target.value))}
            />
            <button className="bg-blue-900 text-white" onClick={fetchData}>
                Search
            </button>

            {optionSections?.map(section => {
                return (
                    <div key={section.label}>
                        <h3>{section.label}</h3>
                        {section.data?.map(item => {
                            return (
                                <label
                                    key={item.id}
                                    className="inline-flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        checked={state[section.type]?.includes(
                                            item.id
                                        )}
                                        name={section.label}
                                        value={item.id}
                                        onChange={e =>
                                            handleChange(e, section.type)
                                        }
                                        className="h-4 w-4 text-gray-900"
                                    />
                                    <span className="ml-2 mb-1 text-sm  text-gray-700">
                                        {item.name}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                );
            })}

            {state.initialDataFetch &&
                planetsState.finalData?.map(item => {
                    return (
                        <li key={item.id}>
                            {item.name} <br />
                        </li>
                    );
                })}
        </section>
    );
}
