import { useEffect, useState } from 'react';


export default function DeleteButR({ notes, setNotes, userId, noteId }) {

    async function deleteNote() {
        let requestData = {
            id_user: userId,
            id_note: noteId
        };

        const response = await fetch('http://localhost/notes/back/web/api/delete-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            // const updatedNotes = data.updatedNotes;
            const updatedNotes = notes.filter(note => note.id_note !== noteId); // Удаляем удаленную заметку из списка
            setNotes(updatedNotes);
            // console.log(notes);
        } else {
            console.error('Ошибка при загрузке данных');
        }
    }
    return (
        <button onClick={() => deleteNote()}>Delete</button>
    )
}
