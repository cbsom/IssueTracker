import React from "react";
import ReactDOM from "react-dom";
import "./Css/index.css";
import App from "./Components/App";
import { ItemListProvider } from "./Components/DataContext.js";

ReactDOM.render(
    <ItemListProvider>
        <App />
    </ItemListProvider>,
    document.getElementById("root")
);
