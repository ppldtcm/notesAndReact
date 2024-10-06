import React from 'react';

export default function SaveUpdatedNoteButR({ userId, noteId, title, body, notes, setNotes, setIsEditing}) {
    async function handleSave() {
        let requestData = {
            id_note: noteId,
            title: title,
            body: body,
            id_user: userId,
        };
        console.log(requestData)

        const response = await fetch('http://localhost/notes/back/web/api/update-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (response.ok) {
            const updatedNotes = notes.map(note =>
                note.id_note === noteId
                    ? { ...note, title: title, body: body } // обновляем заметку
                    : note // оставляем без изменений
            );
            setNotes(updatedNotes);
            setIsEditing(false); // Выходим из режима редактирования
        } else {
            console.error('Ошибка при загрузке данных');
        }
    };

    return (
        <button onClick={() => handleSave()}>Save</button>
    );
};

