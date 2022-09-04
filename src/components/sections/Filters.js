import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";
import apiCall from "../../functions/apiCall";
import { addData } from "../../store/features/dataSlice";
import {
    generateOptions,
    handleOptions,
    handleSearch,
    handleOptionsOnMount
} from "../../store/features/filterSlice";
import Checkbox from "../Checkbox";

export default function Filters({ fetchData }) {
    const [initialFetchDone, setInitialFetchDone] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const filtersState = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const location = useLocation();

    async function fetchDataOnMount() {
        const res = await apiCall(`${location.search}`, "");
        if (!res.error) {
            dispatch(addData(res.data));
            setInitialFetchDone(!initialFetchDone);
        }
    }

    async function fetchAllOptions(type) {
        const res = await apiCall(`${type}s`, "fetchingOptions");
        if (!res.error) {
            return { name: type, data: res.data };
        }
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
        if (initialFetchDone) {
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
                        <h3 className="font-semibold text-lg md:text-xl tracking-tight py-2 text-blue-900">
                            {section.label}
                        </h3>
                        <div className="space-y-3 flex flex-col mt-2">
                            {section.data?.map(item => {
                                return (
                                    <Checkbox
                                        key={item.id}
                                        changeHandler={e =>
                                            handleChange(e, section.type)
                                        }
                                        checkedStatus={filtersState[
                                            section.type
                                        ]?.includes(item.id)}
                                        displayName={item.name}
                                        name={section.label}
                                        value={item.id}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
