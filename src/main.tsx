import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
<<<<<<< HEAD
import App from '@/app/App';
=======
import App from './App.tsx';
>>>>>>> 06634d6 ( INITIAL COMMIT)
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
