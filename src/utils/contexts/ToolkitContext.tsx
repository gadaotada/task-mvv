/* A simple toolkit for testing */
import { createContext, useState, useContext, ReactNode } from 'react';

import { CacheContext } from './CacheContext';

interface ToolkitState {
  error: {
    type: string;
    message: string;
  };
  apiDelay: number;
}

interface ToolkitContextType {
  toolkitState: ToolkitState;
  triggerError: (type: string, message: string) => void;
  clearError: () => void;
  setApiDelay: (delay: number) => void;
  clearCache: () => void;
}

const ToolkitContext = createContext<ToolkitContextType | undefined>(undefined);

export const useToolkit = () => {
  const context = useContext(ToolkitContext);
  if (!context) {
    throw new Error('useToolkit must be used within a ToolkitProvider');
  }
  return context;
};

interface ToolkitProviderProps {
  children: ReactNode;
}

export const ToolkitProvider: React.FC<ToolkitProviderProps> = ({ children }) => {
  const [toolkitState, setToolkitState] = useState<ToolkitState>({ 
    error: { type: '', message: '' },
    apiDelay: 0
  });

  const cacheManager = useContext(CacheContext);

  const triggerError = (type: string, message: string) => {
    setToolkitState({ ...toolkitState, error: { type, message } });
  };

  const clearError = () => {
    setToolkitState({ ...toolkitState, error: { type: '', message: '' } });
  };

  const setApiDelay = (delay: number) => {
    setToolkitState({ ...toolkitState, apiDelay: delay });
  };

  const clearCache = () => {
      cacheManager.clearCache();
  };

  return (
    <ToolkitContext.Provider value={{ toolkitState, triggerError, clearError, setApiDelay, clearCache }}>
      {children}
    </ToolkitContext.Provider>
  );
};
