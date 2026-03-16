import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import snd_thumbTackIn from "./Assets/ThumbTack_In.wav";
import snd_thumbTackOut from "./Assets/Paper_Ripped.wav";


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

const mousePos = { "x": "", "y": "" };

document.addEventListener("mousemove", logMousePos);
function logMousePos(event) {
    mousePos.x = event.screenX;
    mousePos.y = event.screenY;
}

let isSelected = false;
/* console.log(isSelected); */

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

const thumbTackInAudio = new Audio(snd_thumbTackIn);
const thumbTackOutAudio = new Audio(snd_thumbTackOut);


function handlePickUp(event) {    
    targetNote = event.target;
    if (targetNote.className !== "note") return;

    thumbTackOutAudio.play();

    console.log("Note Selected");
    isSelected = true;
   
}

function handleMove() {
    let style = targetNote.style;

    style.position = "absolute";
    style.left = mousePos.x+"px";
    style.top = mousePos.y+"px";

    thumbTackInAudio.play();

    isSelected = false;
    targetNote = null;
}

root.render(
    <React.StrictMode>
        <App mousePos={mousePos} />
    </React.StrictMode>
);
