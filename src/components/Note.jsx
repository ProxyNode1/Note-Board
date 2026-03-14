import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import pinImg from "./../Assets/favpng_53f6118ea64a68c12f4c0bf26362fae1.png";

export default function Note(props) {

    function handleDeleteCard() {
        props.onDelete(props.id);
    }

    return (
        <div className="note">
            <img src={pinImg} alt="Test" />
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={handleDeleteCard}>
                <DeleteIcon />
            </button>
        </div>
    );
}
