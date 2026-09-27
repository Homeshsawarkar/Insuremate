import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { PolicyProvider } from './context/PolicyContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PolicyProvider>
      <App />
    </PolicyProvider>
  </React.StrictMode>,
);
