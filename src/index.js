import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { ItemListProvider } from "./Components/DataContext.js";
import "./Css/index.css";

ReactDOM.render(
    <ItemListProvider>
        <App />
    </ItemListProvider>,
    document.getElementById("root")
);
