import React, { createContext , ReactNode} from 'react';
import { CacheManager } from '../cache/cache-manager';

type CacheManagerProps = {
    children: ReactNode;
};

export const CacheContext = createContext<CacheManager>(new CacheManager());

export const CacheProvider: React.FC<CacheManagerProps> = ({ children }) => {
    const cacheManager = new CacheManager();

    return (
        <CacheContext.Provider value={cacheManager}>
            {children}
        </CacheContext.Provider>
    );
};
