async function apiCall(url, usedFor) {
    const finalUrl =
        usedFor == "fetchingOptions"
            ? `http://localhost:3000/${url}`
            : `http://localhost:3000/planets/${url}`;
    const res = await fetch(finalUrl);
    if (res.status === 200) {
        const data = await res.json();
        return { data, error: false };
    } else {
        return { data: [], error: true };
    }
}

export default apiCall;
