import React from 'react';
import { createRoot } from 'react-dom/client';
import { NewTabPage } from './pages/NewTabPage';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NewTabPage />
  </React.StrictMode>
);
