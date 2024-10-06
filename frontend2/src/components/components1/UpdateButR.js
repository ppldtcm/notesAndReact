import { useEffect, useState } from 'react';

//устанавливаем setIsEditing(true) для того чтобы отредактировать заметку
export default function UpdateButR({ note, notes, setNotes, isEditing, setIsEditing, userId, noteId }) {
    function chacgeIsEdited() {
        setIsEditing(true)
    }

    return (
        <button onClick={() => chacgeIsEdited()}>Update</button>
    )
}
