import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";
import DataDisplay from "./Components/DataDisplay";
import Search from "./Components/Search";
import Sidebar from "./Components/Sidebar";
import { addData } from "./Store/features/dataSlice";
import {
    generateOptions,
    handleOptions,
    handleSearch,
    handleOptionsOnMount
} from "./Store/features/filterSlice";

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

export default function App() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const filtersState = useSelector(state => state.filters);
    const dispatch = useDispatch();

    function generateUrl() {
        let url = `http://localhost:3000/planets?q=${filtersState.searchText}`;
        const { selectedColors, selectedShapes, selectedSizes } = filtersState;
        selectedColors?.forEach(color => (url += `&color=${color}`));
        selectedShapes?.forEach(shape => (url += `&shape=${shape}`));
        selectedSizes?.forEach(size => (url += `&size=${size}`));
        return url;
    }

    async function fetchData() {
        const finalUrl = generateUrl();
        const paramStr = finalUrl.split("?")[1];
        setSearchParams(paramStr);
        const res = await fetch(finalUrl);
        const data = await res.json();
        dispatch(addData(data));
    }

    return (
        <section className="max-w-5xl mx-auto px-3 xl:px-0">
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
                                <Sidebar
                                    fetchData={fetchData}
                                    generateUrl={generateUrl}
                                />
                            </form>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>
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
                            <Sidebar
                                fetchData={fetchData}
                                generateUrl={generateUrl}
                            />
                        </form>
                        <div className="md:col-span-3 mt-2">
                            <div className="max-w-2xl mx-auto   lg:max-w-7xl lg:pl-6">
                                <h2 className="font-semibold text-xl tracking-tight mb-4 text-blue-900">
                                    Results
                                </h2>
                                <DataDisplay />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </section>
    );
}

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
