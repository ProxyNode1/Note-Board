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
    mousePos.x = event.pageX;
    mousePos.y = event.pageY;
    /* console.log(mousePos); */
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
    let { "marginLeft": leftAdjVal,
        "marginTop": topAdjVal,
        "width": notesWidth } = window.getComputedStyle(targetNote);

    // so that the note's mid ends up on the cursor
    /* leftAdjVal = (parseInt(leftAdjVal, 10) + (parseInt(notesWidth, 10) / 2)); */

    leftAdjVal = parseInt(leftAdjVal, 10);
    topAdjVal = parseInt(topAdjVal, 10);

    style.position = "absolute";
    style.left = (mousePos.x - leftAdjVal) + "px";
    style.top = (mousePos.y - topAdjVal) + "px";

    thumbTackInAudio.play();

    isSelected = false;
    targetNote = null;
}

root.render(
    <React.StrictMode>
        <App mousePos={mousePos} />
    </React.StrictMode>
);
