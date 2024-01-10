export class CacheManager {
    defaultDuration = 6 * 60 * 60 * 1000; // 6 hours
    cacheKey = 'swPeopleData'; // Main cache key

    // note here for sake of simplicity if you decided to use the duration param provide the value in miliseconds
    // example : 1h = 3600000 miliseconds
    setCache(query: string, page: number, data: any, duration?: number) {
        const cacheDuration = duration || this.defaultDuration;
        const cacheData = {
            timestamp: Date.now(),
            duration: cacheDuration,
            data: { ...this.getCache(), [`${query}-${page}`]: data },
        };
        localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    }

    // A side note here ... JSON.parse may error out which isn't handled here
    getCache() {
        const cachedData = localStorage.getItem(this.cacheKey);

        return cachedData ? JSON.parse(cachedData).data : {};
    }

    // Checks if the cached data for a specific query and page is valid
    isCacheValid(query: string, page: number) {
        const fullCache = localStorage.getItem(this.cacheKey);
        if (!fullCache) return false;

        const { timestamp, duration, data } = JSON.parse(fullCache);
        const cacheEntry = data[`${query}-${page}`];

        return cacheEntry && (Date.now() - timestamp) < duration;
    }

    getCacheForQuery(query: string, page: number) {
        const cache = this.getCache();

        return cache[`${query}-${page}`];
    }

    clearCache() {
        localStorage.removeItem(this.cacheKey)
    }
}

