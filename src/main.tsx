import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import * as THREE from 'three';
import App from './App.tsx';
import './index.css';

// Ensure ThreeJS is globally accessible across all three-globe and kapsule sub-modules
(window as unknown as { THREE: typeof THREE }).THREE = THREE;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

