import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

export default function App() {
    const [state, setState] = useState({
        searchText: "",
        selectedColors: [],
        selectedShapes: [],
        selectedSizes: [],
        finalData: [],
        shapeOptions: [],
        colorOptions: [],
        sizeOptions: [],
        initialDataFetch: false
    });

    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    async function fetchData() {
        const finalUrl = generateUrl();
        const paramStr = finalUrl.split("?")[1];
        setSearchParams(paramStr);
        const res = await fetch(finalUrl);
        const data = await res.json();
        setState(state => ({ ...state, finalData: data }));
    }

    async function fetchDataOnMount() {
        const res = await fetch(
            `http://localhost:3000/planets/${location.search}`
        );
        const data = await res.json();
        setState(state => ({
            ...state,
            finalData: data,
            initialDataFetch: true
        }));
    }

    function generateUrl() {
        let url = `http://localhost:3000/planets?q=${state.searchText}`;
        const { selectedColors, selectedShapes, selectedSizes } = state;
        selectedColors?.forEach(color => (url += `&color=${color}`));
        selectedShapes?.forEach(shape => (url += `&shape=${shape}`));
        selectedSizes?.forEach(size => (url += `&size=${size}`));
        return url;
    }

    async function allOptions(type) {
        const url = `http://localhost:3000/${type}s`;
        const res = await fetch(url);
        const data = await res.json();
        setState(state => ({ ...state, [`${type}Options`]: data }));
    }

    useEffect(() => {
        allOptions("color");
        allOptions("shape");
        allOptions("size");
        const params = {};
        for (let [key, value] of searchParams.entries()) {
            params[key] =
                params[key] && params[key]?.length !== 0
                    ? [...params[key], value]
                    : [value];
        }
        console.log(params, "params");
        if (Object.keys(params).length !== 0) {
            setState(state => ({
                ...state,
                searchText: params["q"] ?? "",
                selectedColors: params["color"] ?? [],
                selectedShapes: params["shape"] ?? [],
                selectedSizes: params["size"] ?? []
            }));
        }
    }, []);

    useEffect(() => {
        fetchDataOnMount();
    }, []);

    useEffect(() => {
        if (state.initialDataFetch) {
            fetchData();
        }
    }, [state.selectedColors, state.selectedShapes, state.selectedSizes]);

    const handleChange = (e, type) => {
        const val = e.target.value;
        setState(state => ({
            ...state,
            [type]: !state[type]?.includes(val)
                ? [...state[type], val]
                : state[type]?.filter(item => item !== val)
        }));
    };

    const optionSections = [
        {
            label: "Shape",
            data: state.shapeOptions,
            type: "selectedShapes"
        },
        {
            label: "Color",
            data: state.colorOptions,
            type: "selectedColors"
        },
        {
            label: "Size",
            data: state.sizeOptions,
            type: "selectedSizes"
        }
    ];

    return (
        <section>
            <input
                className="border border-gray-400 m-6"
                type="text"
                value={state.searchText}
                onChange={e =>
                    setState(state => ({
                        ...state,
                        searchText: e.target.value
                    }))
                }
            />
            <button
                className="bg-blue-900 text-white"
                onClick={() => {
                    fetchData();
                }}
            >
                Search
            </button>
            {state.colorOptions?.length !== 0 &&
                state.sizeOptions?.length !== 0 &&
                state.shapeOptions?.length !== 0 &&
                optionSections?.map(section => {
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
                                            defaultChecked={state[
                                                section.type
                                            ]?.includes(item.id)}
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

            {state.finalData?.map(item => {
                return (
                    <li key={item.id}>
                        {item.name} <br />
                    </li>
                );
            })}
        </section>
    );
}
