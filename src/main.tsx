import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/design-system.css';
import './styles/app.css';
import { App } from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Missing #root — index.html and main.tsx disagree.');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
