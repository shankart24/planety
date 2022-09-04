import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import DataDisplay from "./components/sections/DataDisplay";
import Search from "./components/sections/Search";
import Filters from "./components/sections/Filters";
import { addData } from "./store/features/dataSlice";
import {
    generateOptions,
    handleOptions,
    handleSearch,
    handleOptionsOnMount
} from "./store/features/filterSlice";

import {
    MenuIcon,
    SearchIcon,
    ShoppingBagIcon,
    ChevronDownIcon,
    ViewGridIcon,
    FilterIcon,
    XIcon,
    MinusSmIcon,
    PlusSmIcon
} from "@heroicons/react/outline";
import {
    Dialog,
    Disclosure,
    Popover,
    Tab,
    Transition,
    Menu
} from "@headlessui/react";
import apiCall from "./functions/apiCall";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const filtersState = useSelector(state => state.filters);
    const planetsState = useSelector(state => state.data);
    const dispatch = useDispatch();

    function generateUrl() {
        let url = `http://localhost:3000/planets?q=${filtersState.searchText}`;
        const { selectedColors, selectedShapes, selectedSizes } = filtersState;
        selectedColors?.forEach(color => {
            if (color.length !== 0) url += `&color=${color}`;
        });
        selectedShapes?.forEach(shape => {
            if (shape.length !== 0) url += `&shape=${shape}`;
        });
        selectedSizes?.forEach(size => {
            if (size.length !== 0) url += `&size=${size}`;
        });
        return url;
    }

    async function fetchData() {
        const finalUrl = generateUrl();
        const paramStr = finalUrl.split("?")[1];
        setSearchParams(paramStr);
        const res = await apiCall(`?${paramStr}`, "");
        if (!res.error) {
            dispatch(addData(res.data));
        }
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="max-w-5xl mx-auto px-3 xl:px-0 mb-12">
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 flex z-40 lg:hidden"
                    onClose={setMobileFiltersOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                            <div className="px-4 flex items-center justify-between">
                                <h2 className="text-lg font-medium text-gray-900"></h2>
                                <button
                                    type="button"
                                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                                    onClick={() => setMobileFiltersOpen(false)}
                                >
                                    <XIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            <form className="">
                                <Filters fetchData={fetchData} />
                            </form>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>
            {isLoading ? (
                <div className="flex flex-col justify-center items-center h-52">
                    <svg
                        aria-hidden="true"
                        className="mr-2 w-8 h-8 text-blue-900 animate-spin  fill-gray-50"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <p className="text-md mr-1 mt-2 tracking-tight text-blue-900">
                        Loading
                    </p>
                </div>
            ) : (
                <main className="max-w-7xl mx-auto px-4  ">
                    <Search fetchData={fetchData} />
                    <div className="relative z-10 flex items-center justify-end   ">
                        <div className="flex items-center py-2">
                            <button
                                type="button"
                                className="p-2 -m-2 sm:ml-6  text-gray-900  font-medium flex md:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <p className="text-md">Filters</p>
                                <FilterIcon
                                    className="w-5 h-5 ml-2"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                    <section className="">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-10">
                            <form className="hidden md:block">
                                <Filters fetchData={fetchData} />
                            </form>
                            <div className="md:col-span-3 mt-2">
                                <div className="max-w-2xl mx-auto   lg:max-w-7xl lg:pl-6">
                                    <h2 className="font-semibold text-xl tracking-tight mb-4 text-blue-900">
                                        {planetsState?.finalData?.length}{" "}
                                        {`Result${
                                            planetsState?.finalData?.length !==
                                            1
                                                ? "s"
                                                : ""
                                        }`}
                                    </h2>
                                    <DataDisplay />
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            )}
        </section>
    );
}

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
