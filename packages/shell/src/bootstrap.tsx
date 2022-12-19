// host/src/bootstrap.js
import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
    return (
        <div>
            Shell Page
        </div>
    )
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(<App />);