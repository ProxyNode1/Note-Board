import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

document.addEventListener("mousemove", logMousePos);

const mousePos = {"x": "", "y": ""};

function logMousePos(event) {
    mousePos.x = event.screenX;
    mousePos.y = event.screenY;
}

root.render(
    <React.StrictMode>
        <App mousePos = {mousePos}/>
    </React.StrictMode>
);
