import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './views/app';
import './styles/common.scss';
import './styles/reset.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
