import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider} from 'react-query';
import { UserContextProvider } from './context/userContext';
import { BrowserRouter as Router } from "react-router-dom";

// css
import './index.css';

// client
const client = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
  <QueryClientProvider client={client}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </QueryClientProvider>
  </UserContextProvider>
);

reportWebVitals();
