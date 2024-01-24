import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';


export const useDebouncedSearch = (search: string, delay = 700) => {
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [_searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            setDebouncedSearch(search);
        }, delay);

        return () => clearTimeout(delayTimer);
    }, [search, delay]);


    useEffect(() => {
        if (debouncedSearch !== undefined)
            setSearchParams((prevParams) => ({
                search: debouncedSearch || '',
                page: "1",
                pageSize: prevParams.get('pageSize') || "10",
            }));
    }, [debouncedSearch, setSearchParams]);

    return debouncedSearch;
};






