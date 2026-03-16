import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

import "./style.css"

export default function App(props) {
    const [noteList, setNoteList] = useState([]);

    /* const [mousePos, setMousePos] = useState({ "x": "", "y": "" }); */

    function addNote(newNote) {
        setNoteList((prevVal) => {
            return [...prevVal, newNote];
        });
    }

    function deleteNote(index) {
        setNoteList((prevVal) => {
            let tempArr = [...prevVal];
            tempArr.splice(index, 1);
            return tempArr;
        });
    }

    /* function logMousePos(event) {
        console.log("X " + event.screenX);
        console.log("Y " + event.screenY);
    }
 */
    return (
        <div className = "app">
            <Header />
            <CreateArea onAdd={addNote} />

            {noteList.map((noteItem, index) => {
                return (
                    <Note
                        key={index}
                        index={index}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                        mousePos = {props.mousePos}
                        zIndex={index}
                    />
                );
            })}

            <Note
                key={1}
                index={1}
                title={"title"}
                content={"content"}
                onDelete={deleteNote}
                mousePos = {props.mousePos}
                zIndex={1}
            />

            <Footer />
        </div>
    );
}
