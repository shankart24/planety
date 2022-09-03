import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";
import { addData } from "../Store/features/dataSlice";
import {
    generateOptions,
    handleOptions,
    handleSearch,
    handleOptionsOnMount
} from "../Store/features/filterSlice";

export default function Sidebar({ generateUrl, fetchData }) {
    const [state, setState] = useState({
        initialDataFetch: false
    });

    const filtersState = useSelector(state => state.filters);
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    async function fetchDataOnMount() {
        const res = await fetch(
            `http://localhost:3000/planets/${location.search}`
        );
        const data = await res.json();
        dispatch(addData(data));
        setState(state => ({
            ...state,
            initialDataFetch: true
        }));
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
        dispatch(handleOptions({ name: type, data: e.target.value }));
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
        <div className=" space-y-5 px-6 md:px-0 py-3 md:py-0 border-r border-gray-200">
            {optionSections?.map(section => {
                return (
                    <div key={section.label} className="">
                        <h3 className="font-semibold text-xl tracking-tight py-2 text-blue-900">
                            {section.label}
                        </h3>
                        <div className="space-y-3 flex flex-col mt-2">
                            {section.data?.map(item => {
                                return (
                                    <label
                                        key={item.id}
                                        className="inline-flex items-center cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filtersState[
                                                section.type
                                            ]?.includes(item.id)}
                                            name={section.label}
                                            value={item.id}
                                            onChange={e =>
                                                handleChange(e, section.type)
                                            }
                                            className="h-4 w-4 text-gray-900 font-medium cursor-pointer"
                                        />
                                        <span className="ml-2 text-md  text-gray-900 ">
                                            {item.name}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
