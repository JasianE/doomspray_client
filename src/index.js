import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-fy4uq4tv3la0alsd.us.auth0.com";
const clientId = "e7cSQZFvW21xopndIyUx9KeulfFiTQKW";

const root = ReactDOM.createRoot(document.getElementById('root'));

const onRedirectCallback = (appState) => {
  window.history.replaceState({}, document.title, appState?.returnTo || '/dashboard');
};

root.render(
    <React.StrictMode>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin + "/dashboard",
        }}
        onRedirectCallback={onRedirectCallback}
        cacheLocation="localstorage"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

