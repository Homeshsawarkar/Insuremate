import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { PolicyProvider } from './context/PolicyContext.jsx';
import { ErrorBoundary } from './components/common/ErrorBoundary.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <PolicyProvider>
        <App />
      </PolicyProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
