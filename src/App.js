import { useState, useEffect } from "react";
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

export default function App() {
    const filtersState = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

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
        <section>
            <Search fetchData={fetchData} />
            <Sidebar fetchData={fetchData} generateUrl={generateUrl} />
            <DataDisplay />
        </section>
    );
}
