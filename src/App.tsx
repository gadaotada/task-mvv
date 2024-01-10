import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginForm from './components/login/LoginForm';
import TableParent from './components/table/TableParent';
import NotFound from './components/ui/NotFound'
import Trigger from './components/tool/Trigger';
import { ThemeProvider } from './utils/contexts/ThemeProvider';
import ThemeToggle from './components/ui/ThemeToggler';
import { CacheProvider } from './utils/contexts/CacheContext';
import { ToolkitProvider } from './utils/contexts/ToolkitContext';
import './App.css';

const App: React.FC = () => {

  return (
    <ThemeProvider>
      <ToolkitProvider>
      <CacheProvider>
        <BrowserRouter>
          <div className="theme-toggle-container">
            <ThemeToggle />
          </div>
          <Trigger />
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/table" element={<TableParent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CacheProvider>
      </ToolkitProvider>
    </ThemeProvider>
  );
};

export default App;