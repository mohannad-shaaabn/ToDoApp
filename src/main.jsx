import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "flowbite/dist/flowbite.js";
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import App from './App.jsx'
import { js } from '@eslint/js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
