import { useState, useEffect } from "react";

export default function App() {
    const [state, setState] = useState({
        searchText: "",
        selectedColors: [],
        selectedShapes: [],
        selectedSizes: [],
        finalData: [],
        shapeOptions: [],
        colorOptions: [],
        sizeOptions: []
    });

    async function fetchData() {
        const finalUrl = generateUrl();
        const res = await fetch(finalUrl);
        const data = await res.json();
        setState(state => ({ ...state, finalData: data }));
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
    }, []);

    useEffect(() => {
        fetchData();
    }, [state.selectedColors, state.selectedShapes, state.selectedSizes]);

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
                [
                    { label: "Shape", data: state.shapeOptions },
                    { label: "Color", data: state.colorOptions },
                    { label: "Size", data: state.sizeOptions }
                ]?.map(section => {
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
                                            name="shapes"
                                            value={item.id}
                                            onChange={e => {
                                                const val = e.target.value;
                                                setState(state => ({
                                                    ...state,
                                                    selectedColors:
                                                        !state.selectedColors?.includes(
                                                            val
                                                        )
                                                            ? [
                                                                  ...state.selectedColors,
                                                                  val
                                                              ]
                                                            : state.selectedColors?.filter(
                                                                  item =>
                                                                      item !==
                                                                      val
                                                              )
                                                }));
                                            }}
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
