import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouterCustom from "./router";
import "./style/style.scss";
import { UserProvider } from "./context/UserContext";
import { SnackbarProvider } from "./context/SnackbarContext";
//import './index.css';
//import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserProvider>
        <SnackbarProvider>
            <BrowserRouter>
                <RouterCustom />
            </BrowserRouter>
        </SnackbarProvider>
    </UserProvider>
);
