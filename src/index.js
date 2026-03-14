import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

let isSelected = false;
console.log(isSelected);

const mousePos = { "x": "", "y": "" };

document.addEventListener("mousemove", logMousePos);
function logMousePos(event) {
    mousePos.x = event.screenX;
    mousePos.y = event.screenY;
}

document.addEventListener("click", handleClick);
function handleClick(event) {
    if (!isSelected) {        
        handlePickUp(event);
    }

    else {
        handleMove();
    }
}

let targetNote = null;

function handlePickUp(event) {    
    targetNote = event.target;
    if (targetNote.className !== "note") return;

    console.log("Note Selected");
    isSelected = true;    
}

function handleMove() {
    let style = targetNote.style;

    style.position = "absolute";
    style.left = mousePos.x+"px";
    style.top = mousePos.y+"px";

    isSelected = false;
    targetNote = null;
}

root.render(
    <React.StrictMode>
        <App mousePos={mousePos} />
    </React.StrictMode>
);
