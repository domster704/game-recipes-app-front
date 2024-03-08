import React from "react";
import "./index.css";
import {App} from "./App";
import {createRoot} from 'react-dom/client';

const root = createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

