import { useEffect, useState } from 'react';

import DeleteButR from './components1/DeleteButR'
import UpdateButR from './components1/UpdateButR'
import SaveUpdatedNoteButR from './components1/SaveUpdatedNoteButR'
import TagR from './components1/TagR'

import Markdown from 'react-markdown'



export default function Note({ note, notes, setNotes }) {
    const [isEditing, setIsEditing] = useState(false); // редактирование
    const [currentNote, setCurrentNote] = useState({ title: note.title, body: note.body, tag: note.tag });

    const handleEditClick = (note) => {
        setIsEditing(true);
        setCurrentNote({ title: note.title, body: note.body, tag: note.tag });
    };


    const handleChange = (event) => {
        const { name, value } = event.target; // получаем имя и значение измененного поля
        setCurrentNote((prevNote) => ({ ...prevNote, [name]: value, })); // обновляем только измененное поле
        console.log(note.tag)

    }



    return (
        <>
            {isEditing ? (
                <tr key={note.id_note} padding={'10px'}>
                    <td>{note.id_note}</td>

                    <td><input type="text" name="title" value={currentNote.title} onChange={handleChange} /></td>
                    <td><input type="text" name="body" value={currentNote.body} onChange={handleChange} />  </td>
                    {/* <td>{note.tag}</td> */}
                    <td>
                        <TagR selectedTag={currentNote.tag} onTagChange={(value) => setCurrentNote((prevNote) => ({ ...prevNote, tag: value }))} />
                    </td>
                    
                    <td>{note.file_url ? (
                        <a href={note.file_url} target="_blank" rel="noopener noreferrer">Download File</a>
                    ) : (
                        <span>No file</span>
                    )}</td>

                    <td><DeleteButR notes={notes} setNotes={setNotes} userId={note.id_user} noteId={note.id_note} /></td>
                    <td><SaveUpdatedNoteButR userId={note.id_user} noteId={note.id_note} title={currentNote.title} body={currentNote.body} tag={currentNote.tag} notes={notes} setNotes={setNotes} setIsEditing={setIsEditing} /></td>

                </tr>
            ) : (
                <tr key={note.id_note} padding={'10px'}>
                    <td>{note.id_note}</td>
                    <td>{note.title}</td>
                    <td>{note.body}</td>
                    <td>{note.tag}</td>

                    <td>{note.file_url ? (
                        <a href={note.file_url} target="_blank" rel="noopener noreferrer">Download File</a>
                    ) : (
                        <span>No file</span>
                    )}</td>

                    <td><DeleteButR notes={notes} setNotes={setNotes} userId={note.id_user} noteId={note.id_note} /></td>
                    <td><UpdateButR note={note} setIsEditing={setIsEditing} onEditClick={handleEditClick} /></td>

                </tr>
            )
            }
        </>
    )
}
