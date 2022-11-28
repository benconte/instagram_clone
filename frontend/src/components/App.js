import React from "react";
import { createRoot } from "react-dom/client";
import Base from "./Base";
import "../app.css"
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/bundle";

function App() {
    return(
        <Base />
    )
}

const root = createRoot(document.getElementById("app"))

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

export default App