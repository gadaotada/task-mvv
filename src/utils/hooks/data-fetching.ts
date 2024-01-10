import { useState, useEffect, useContext } from 'react';

import { useToolkit } from '../contexts/ToolkitContext';
import { CacheContext } from '../contexts/CacheContext';

type SwPerson = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
} | null;

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

const useFetchPeople = (page: number, searchQuery?: string) => {
    const [data, setData] = useState<SwPerson[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const cacheManager = useContext(CacheContext);
    const { toolkitState } = useToolkit();
    const apiDelay = toolkitState.apiDelay;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            
            const cacheKey = searchQuery ? `${searchQuery}-${page}` : `default-${page}`;

            const cached = cacheManager.getCacheForQuery(cacheKey, page);
            if (cacheManager.isCacheValid(cacheKey, page)) {
                setData(cached.results);
                setTotal(cached.total);
                setIsLoading(false);
                return;
            }

            if (apiDelay > 0) {
                await new Promise(resolve => setTimeout(resolve, apiDelay));
            }

            try {
                const queryParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : '';
                const response = await fetch(`${apiEndpoint}/?page=${page}${queryParam}`);
                const jsonData = await response.json();
                if (response.status === 200 || response.ok) {
                    cacheManager.setCache(cacheKey, page, { results: jsonData.results, total: jsonData.count }, 3600000);
                    setData(jsonData.results);
                    setTotal(jsonData.count);
                } else {
                    setError(`API error code: ${response.status}, explanation: ${jsonData.detail}`)
                }
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [page, searchQuery, cacheManager, apiDelay]);

    return { data, isLoading, error, total };
};


export default useFetchPeople;
