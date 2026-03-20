import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

import snd_type_1 from "../Assets/Typewriter_1.wav";
import snd_type_2 from "../Assets/Typewriter_2.wav";
import snd_space from "../Assets/Typewriter_Space.wav";
import snd_submit from "../Assets/Typewriter_Finish.wav";

const typeAudio = [new Audio(snd_type_1), new Audio(snd_type_2)];
const typeAudio_Space = new Audio(snd_space);
const typeAudio_Submit = new Audio(snd_submit);

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
        event.preventDefault();
        typeAudio_Submit.play();
        props.onAdd(note);
        setNote({
            title: "",
            content: "",
        });
    }

    function handleClick() {
        setIsExpanded(true);
    }

    function handleInput(event) {
        let inputVal = event.nativeEvent.data;

        /* console.log(inputVal); */

        if (inputVal === null) return;
        else if (inputVal === " ") {
            typeAudio_Space.play();
        } else {
            let audioIdx = Math.round(Math.random());
            typeAudio[audioIdx].play();
        }
    }

    return (
        <div>
            <form className="create-note" onSubmit={submitNote}>
                <input
                    onClick={handleClick}
                    onChange={handleNoteChange}
                    name="title"
                    placeholder="Note's Title"
                    value={note.title}
                    onInput={handleInput}
                />

                {isExpanded ? (
                    <textarea
                        name="content"
                        onChange={handleNoteChange}
                        value={note.content}
                        placeholder="Content"
                        rows="3"
                        onInput={handleInput}
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
