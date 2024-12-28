import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PsiProvider } from './Context/Context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PsiProvider>
      <App />
    </PsiProvider>
  </React.StrictMode>
);


