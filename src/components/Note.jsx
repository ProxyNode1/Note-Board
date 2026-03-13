import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import pinImg from "./../Assets/favpng_53f6118ea64a68c12f4c0bf26362fae1.png"

export default function Note(props) {

    function handleClick() {
        //if !pickedUp
        // handlePickUp();
        // else
        // handleDrop();
    }

    function handleRemove(event) {
        const note = event.target;
        console.log(note.nodeName); 

        if (note.nodeName !== "DIV") return;

        const style = note.style;
        console.log(note.nodeName);

        /* style.backgroundColor = "red"; */

        // set position to relative
        style.position = "absolute";

        // set location of the note
        /* style.top = "0px";
        style.left = "0px"; */

        style.top = props.mousePos.y+"px";
        style.left = props.mousePos.x+"px";
        
        console.log(props.mousePos);
    }

    function handleDeleteCard() {
    props.onDelete(props.id);
  }

    return (
        <div className="note" onClick={handleRemove}>
            <img src={pinImg} alt="Test" />
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button
                onClick={handleDeleteCard}
            >
                <DeleteIcon />
            </button>
        </div>
    );
}
