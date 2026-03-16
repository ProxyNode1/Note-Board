import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

import snd_writer from "../Assets/Typewriter.wav";

const typeAudio = new Audio(snd_writer);

export default function CreateArea(props) {
    const [note, setNote] = useState({
        title: "",
        content: "",
    });

    const [isExpanded, setIsExpanded] = useState(false);

    function handleNoteChange(event) {
        const { name, value } = event.target;

        setNote((prevNote) => {
            return {
                ...prevNote,
                [name]: value,
            };
        });
    }

    function submitNote(event) {
        props.onAdd(note);
        setNote({
            title: "",
            content: "",
        });
        event.preventDefault();
    }

    function handleClick() {
        setIsExpanded(true);
    }

    function handleFormInput() {
        /* typeAudio.play(); */
    }

    return (
        <div>
            <form className="create-note" onSubmit={submitNote} onInput={handleFormInput}>
                <input
                    onClick={handleClick}
                    onChange={handleNoteChange}
                    name="title"
                    placeholder="Title"
                    value={note.title}
                />

                {isExpanded ? (
                    <textarea
                        name="content"
                        onChange={handleNoteChange}
                        value={note.content}
                        placeholder="Take a note..."
                        rows="3"
                    />
                ) : null}

                <Zoom in={isExpanded ? true : false}>
                    <Fab onClick={submitNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}
