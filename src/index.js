import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { GolfDataProvider } from "./context/golf-data.context";


const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <GolfDataProvider>
            <App />
        </GolfDataProvider>
    </BrowserRouter>
);