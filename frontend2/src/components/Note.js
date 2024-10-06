import { useEffect, useState } from 'react';

import DeleteButR from './components1/DeleteButR'
import UpdateButR from './components1/UpdateButR'
import SaveUpdatedNoteButR from './components1/SaveUpdatedNoteButR'




export default function Note({ note, notes, setNotes }) {
    const [isEditing, setIsEditing] = useState(false); // редактирование
    const [currentNote, setCurrentNote] = useState({ title: note.title, body: note.body });

    const handleEditClick = (note) => {
        setIsEditing(true);
        setCurrentNote({ title: note.title, body: note.body });
    };


    const handleChange = (event) => {
        //setCurrentNote(event.target.currentNote);
        const { name, value } = event.target; // получаем имя и значение измененного поля
        setCurrentNote((prevNote) => ({
            ...prevNote,
            [name]: value, // обновляем только измененное поле
        }));
    }



    return (
        <>
            {isEditing ? (
                <tr key={note.id_note} padding={'10px'}>
                    <td>{note.id_note}</td>

                    <td><input type="text" name="title" value={currentNote.title} onChange={handleChange} /></td>
                    <td><input type="text" name="body" value={currentNote.body} onChange={handleChange} />  </td>
                    {/* <SaveUpdatedNoteButR userId={note.id_user} noteId={note.id_note} title={currentNote.title} body={currentNote.body} notes={notes} setNotes={setNotes} setIsEditing={setIsEditing} /></td> */}

                    <td><DeleteButR notes={notes} setNotes={setNotes} userId={note.id_user} noteId={note.id_note} /></td>
                    <td><SaveUpdatedNoteButR userId={note.id_user} noteId={note.id_note} title={currentNote.title} body={currentNote.body} notes={notes} setNotes={setNotes} setIsEditing={setIsEditing} /></td>

                </tr>
            ) : (
                <tr key={note.id_note} padding={'10px'}>
                    <td>{note.id_note}</td>
                    <td>{note.title}</td>
                    <td>{note.body}</td>
                    <td><DeleteButR notes={notes} setNotes={setNotes} userId={note.id_user} noteId={note.id_note} /></td>
                    <td><UpdateButR note={note} setIsEditing={setIsEditing} onEditClick={handleEditClick} /></td>

                </tr>
            )
            }
        </>
    )
}
