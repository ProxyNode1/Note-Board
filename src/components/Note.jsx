import React, {useRef} from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import pinImg from "./../Assets/BulletinPin.png";

import snd_paperCrumple from "../Assets/CrumplePaper.wav";
import snd_thumbTackIn from "../Assets/ThumbTack_In.wav";
import snd_thumbTackOut from "../Assets/Paper_Ripped.wav";

const deleteNoteAudio = new Audio(snd_paperCrumple);
const thumbTackInAudio = new Audio(snd_thumbTackIn);
const thumbTackOutAudio = new Audio(snd_thumbTackOut);

export default function Note(props) {

    const bulletinPinRef = useRef(null);


    function startDragging(event) {
        let targetNote = "";

        if (event.target.className === "note") {
            targetNote = event.target;
        } else if (event.target.parentNode.className === "note") {
            targetNote = event.target.parentNode;
        } else return false;

        // this allows the notes to be moved in the viewport without restriction
        targetNote.style.position = "absolute";

        // Lets suppose a note moves around its origin. So, when a user clicks
        // and hold the note, the note needs to moves around the cursor's location,
        // as if that is the origin of the note. to do this, we find the
        // difference in the values of origin point of the note and the
        // current cursor's position so while dragging the note we can correct
        // the origin point values of the not by subtracting the new cursor
        // location and the offset value.

        // TODO: This needs to consider the position from left end of the page

        //getting the current position of the cursor, relative to the viewport
        let initMousePosX = event.pageX;
        let initMousePosY = event.pageY;

        //getting the origin point of the note, relative to the viewport
        let noteCoordX =
            targetNote.getBoundingClientRect().left + window.scrollX;
        let noteCoordY =
            targetNote.getBoundingClientRect().top + window.scrollY;

        // determining the difference in the between note's origin point
        // and cursor location
        let offsetX = initMousePosX - noteCoordX;
        let offsetY = initMousePosY - noteCoordY;

        document.addEventListener("mousemove", dragElement);
        document.addEventListener("mouseup", stopDragging);
        targetNote.addEventListener("focusout", handleFocusLost);

        // Handle feedback 
        bulletinPinRef.current.style.visibility = "hidden";
        targetNote.style.cursor = "grabbing";        
        thumbTackOutAudio.play();
        targetNote.classList.add("dragged");

        function dragElement(event) {
            // correcting the origin point of the note by subtracting
            // current cursor position and the offset
            targetNote.style.left = event.clientX - offsetX + "px";
            targetNote.style.top = event.clientY - offsetY + "px";
        }

        function stopDragging() {
            // Handle feedback
            targetNote.style.cursor = "grab";
            thumbTackInAudio.play();
            bulletinPinRef.current.style.visibility = "visible";
            
            // Event Listener Cleanup
            targetNote.classList.remove("dragged");
            document.removeEventListener("mousemove", dragElement);
            document.removeEventListener("mouseup", stopDragging);
        }
    }

    function handleFocusLost(event) {
        event.target.removeEventListener("mousedown", startDragging);
    }

    function handleDeleteCard(event) {
        //event.preventDefault();
        event.stopPropagation();

        deleteNoteAudio.play();
        props.onDelete(props.id);
    }

    return (
        <div
            className="note"
            zIndex={props.zindex}
            tabIndex={0}
            onMouseDown={startDragging}
        >
            <img src={pinImg} alt="bulletin pin" ref={bulletinPinRef}/>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={handleDeleteCard}>
                <DeleteIcon />
            </button>
        </div>
    );
}
