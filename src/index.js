import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PsiProvider } from './Context/Context';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PsiProvider>
      <App />
    </PsiProvider>
  </React.StrictMode>
);


